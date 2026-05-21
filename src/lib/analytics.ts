import { track } from "@vercel/analytics";

type EventData = Record<string, string | number | boolean | null>;

/**
 * Thin, fail-safe wrapper around Vercel Analytics custom events. Page views and
 * visitor metrics are captured automatically by the Analytics component in the
 * root layout. These named events answer "what did people actually open".
 */
export function event(name: string, data?: EventData) {
  try {
    track(name, data);
  } catch {
    // Analytics must never break the experience.
  }
}
