const CACHE_PREFIX = "chula-essence:cache:";
const inFlight = new Map();

function storageKey(key) {
  return `${CACHE_PREFIX}${key}`;
}

function readEntry(key) {
  try {
    const raw = localStorage.getItem(storageKey(key));
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (!entry || !Object.prototype.hasOwnProperty.call(entry, "data"))
      return null;
    return entry;
  } catch {
    localStorage.removeItem(storageKey(key));
    return null;
  }
}

function writeEntry(key, data) {
  try {
    localStorage.setItem(
      storageKey(key),
      JSON.stringify({ data, cachedAt: Date.now() }),
    );
  } catch {
    // Storage can be unavailable or full; the network response still works.
  }
}

function refresh(key, fetcher) {
  if (inFlight.has(key)) return inFlight.get(key);

  const request = Promise.resolve()
    .then(fetcher)
    .then((data) => {
      writeEntry(key, data);
      return data;
    })
    .finally(() => inFlight.delete(key));

  inFlight.set(key, request);
  return request;
}

export function getCached(key, fetcher, { ttl = 300000 } = {}) {
  const entry = readEntry(key);
  if (!entry) return refresh(key, fetcher);

  if (Date.now() - entry.cachedAt > ttl) {
    refresh(key, fetcher).catch(() => {});
  }

  return Promise.resolve(entry.data);
}

export function invalidateCache(...keys) {
  keys.forEach((key) => {
    try {
      localStorage.removeItem(storageKey(key));
    } catch {
      // Ignore storage failures; the next request will revalidate.
    }
  });
}

export function invalidateCachePrefix(prefix) {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(storageKey(prefix)))
      .forEach((key) => localStorage.removeItem(key));
  } catch {
    // Ignore storage failures; the next request will revalidate.
  }
}

export function getUserCacheScope() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?._id || user?.id || user?.email || "anonymous";
  } catch {
    return "anonymous";
  }
}
