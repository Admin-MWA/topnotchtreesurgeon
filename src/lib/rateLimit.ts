type Entry = {
  count: number;
  expiresAt: number;
};

const store = new Map<string, Entry>();

export function isRateLimited(key: string, maxRequests = 5, windowMs = 60000) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.expiresAt < now) {
    store.set(key, { count: 1, expiresAt: now + windowMs });
    return false;
  }

  if (current.count >= maxRequests) {
    return true;
  }

  current.count += 1;
  return false;
}
