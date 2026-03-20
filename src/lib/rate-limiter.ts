// Simple in-memory rate limiter per session
// groq/compound: 250 req/day, 30 RPM — we apply session-level limits

const sessionStore = new Map<string, { count: number; resetAt: number }>();

const SESSION_LIMIT = 15; // max AI messages per session
const SESSION_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

export function checkRateLimit(sessionId: string): { allowed: boolean; remaining: number; message?: string } {
  const now = Date.now();
  const record = sessionStore.get(sessionId);

  if (!record || now > record.resetAt) {
    sessionStore.set(sessionId, { count: 1, resetAt: now + SESSION_WINDOW_MS });
    return { allowed: true, remaining: SESSION_LIMIT - 1 };
  }

  if (record.count >= SESSION_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      message: `Rate limit reached (${SESSION_LIMIT} AI messages/session). Use commands like 'help', 'about', 'projects' instead — they're instant and unlimited.`,
    };
  }

  record.count += 1;
  sessionStore.set(sessionId, record);
  return { allowed: true, remaining: SESSION_LIMIT - record.count };
}

// Clean up old sessions every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of sessionStore.entries()) {
    if (now > val.resetAt) sessionStore.delete(key);
  }
}, SESSION_WINDOW_MS);
