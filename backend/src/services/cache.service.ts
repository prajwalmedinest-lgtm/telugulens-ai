type CacheEntry = { value: Buffer | string | object; expiresAt: number };

class SimpleCache {
  private store = new Map<string, CacheEntry>();

  get(key: string) {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  set(key: string, value: Buffer | string | object, ttl = 60 * 60 * 1000) {
    const expiresAt = Date.now() + ttl;
    this.store.set(key, { value, expiresAt });
  }

  del(key: string) {
    this.store.delete(key);
  }
}

export const cache = new SimpleCache();
