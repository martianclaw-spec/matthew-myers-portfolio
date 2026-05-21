import { knowledgeBase, type KnowledgeSnippet } from "@/lib/data/knowledge";

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "to", "of", "and", "or",
  "in", "on", "for", "with", "what", "who", "how", "do", "does", "did", "can",
  "could", "would", "should", "matthew", "he", "his", "him", "me", "tell",
  "about", "you", "your", "i", "it", "that", "this", "as", "at", "by", "from",
  "has", "have", "had", "will", "any", "some", "good", "great",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function scoreSnippet(snippet: KnowledgeSnippet, tokens: string[], query: string): number {
  const lowerQuery = query.toLowerCase();
  let score = 0;

  for (const kw of snippet.keywords) {
    if (lowerQuery.includes(kw.toLowerCase())) {
      // Multi-word keyword phrase match is a strong signal.
      score += kw.includes(" ") ? 5 : 3;
    }
  }

  const haystack = (snippet.title + " " + snippet.text).toLowerCase();
  for (const token of tokens) {
    if (snippet.keywords.some((k) => k.toLowerCase().includes(token))) score += 1;
    if (haystack.includes(token)) score += 0.5;
  }

  return score;
}

export interface RetrievalResult {
  snippets: KnowledgeSnippet[];
  matched: boolean;
}

/**
 * Retrieve the most relevant knowledge snippets for a question. Returns a
 * small, focused set so only relevant grounding is passed to the model. When
 * nothing scores, falls back to the profile and contact so the assistant can
 * still respond helpfully and honestly.
 */
export function retrieve(question: string, limit = 4): RetrievalResult {
  const tokens = tokenize(question);

  const scored = knowledgeBase
    .map((snippet) => ({ snippet, score: scoreSnippet(snippet, tokens, question) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    const profile = knowledgeBase.find((s) => s.id === "profile-overview");
    const contact = knowledgeBase.find((s) => s.id === "contact");
    return {
      snippets: [profile, contact].filter(Boolean) as KnowledgeSnippet[],
      matched: false,
    };
  }

  return {
    snippets: scored.slice(0, limit).map((s) => s.snippet),
    matched: true,
  };
}
