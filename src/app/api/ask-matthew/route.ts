import { NextRequest, NextResponse } from "next/server";
import { retrieve } from "@/lib/retrieval";
import { systemPrompt } from "@/lib/data/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_QUESTION_LENGTH = 500;

// Best-effort in-memory rate limit. On serverless this is per-instance, which
// is enough to blunt casual abuse. Swap for a shared store if needed later.
const RATE_LIMIT = 25;
const RATE_WINDOW_MS = 5 * 60 * 1000;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function buildContext(snippets: { source: string; text: string }[]): string {
  return snippets
    .map((s) => `Source: ${s.source}\n${s.text}`)
    .join("\n\n");
}

async function callAnthropic(question: string, context: string): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  const model = process.env.ANTHROPIC_MODEL ?? "claude-3-5-haiku-latest";

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 500,
        system: `${systemPrompt}\n\nKNOWLEDGE BASE:\n${context}`,
        messages: [{ role: "user", content: question }],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.content?.[0]?.text;
    return typeof text === "string" ? text.trim() : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function callOpenAI(question: string, context: string): Promise<string | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: 500,
        messages: [
          { role: "system", content: `${systemPrompt}\n\nKNOWLEDGE BASE:\n${context}` },
          { role: "user", content: question },
        ],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    return typeof text === "string" ? text.trim() : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Deterministic grounded answer used when no model key is configured. It is
// honest by construction because it only returns approved knowledge text.
function fallbackAnswer(
  matched: boolean,
  snippets: { text: string }[],
): string {
  if (!matched) {
    return "I do not have that specific information in my knowledge base. The best move is to ask Matthew directly. You can also ask me about his projects, technical stack, AI-native workflow, or fit for a role.";
  }
  return snippets
    .slice(0, 2)
    .map((s) => s.text)
    .join("\n\n");
}

export async function POST(req: NextRequest) {
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down and try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const question = (body as { question?: unknown })?.question;
  if (typeof question !== "string" || question.trim().length === 0) {
    return NextResponse.json({ error: "A question is required." }, { status: 400 });
  }
  if (question.length > MAX_QUESTION_LENGTH) {
    return NextResponse.json(
      { error: "That question is too long. Please keep it under 500 characters." },
      { status: 400 },
    );
  }

  const trimmed = question.trim();
  const { snippets, matched } = retrieve(trimmed);
  const context = buildContext(snippets);
  const sources = Array.from(new Set(snippets.map((s) => s.source)));

  const answer =
    (await callAnthropic(trimmed, context)) ??
    (await callOpenAI(trimmed, context)) ??
    fallbackAnswer(matched, snippets);

  return NextResponse.json({
    answer,
    sources: matched ? sources : [],
    grounded: matched,
  });
}
