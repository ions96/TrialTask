interface Storage {
  getItem(key: string): unknown | null | Promise<unknown | null>;
  setItem(key: string, value: unknown): void | Promise<void>;
  [key: string]: any;
}

export interface Config {
  staleTime?: number;
  cacheTime?: number;
  storage: Storage;
  serialize?: (value: any) => any;
  deserialize?: (value: any) => any;
}

type StaleWhileRevalidateCache = <ReturnValue>(
  cacheKey: string | (() => string),
  fn: () => Promise<ReturnValue>,
  updateFn: (value: ReturnValue) => void,
) => Promise<ReturnValue>;

type StaleWhileRevalidate = StaleWhileRevalidateCache;

export function createStaleWhileRevalidateCache(
  config: Config,
): StaleWhileRevalidate {
  const {storage, staleTime, cacheTime, serialize, deserialize} =
    parseConfig(config);

  async function staleWhileRevalidate<ReturnValue>(
    cacheKey: string | (() => string),
    fn: () => Promise<ReturnValue>,
    updateFn: (value: ReturnValue) => void,
  ): Promise<ReturnValue> {
    const key = isFunction(cacheKey) ? String(cacheKey()) : String(cacheKey);
    const timeKey = `${key}_time`;

    async function retrieveCachedValue() {
      try {
        let [cachedValue, cachedTime] = await Promise.all([
          storage.getItem(key),
          storage.getItem(timeKey),
        ]);

        cachedValue = deserialize(cachedValue);

        if (isNil(cachedValue)) {
          return {cachedValue: null, cachedAge: 0};
        }

        const now = Date.now();
        const cachedAge = now - Number(cachedTime);

        if (cachedAge > cacheTime) {
          cachedValue = null;
        }
        return {cachedValue, cachedAge};
      } catch (error) {
        return {cachedValue: null, cachedAge: 0};
      }
    }

    async function persistValue(result: ReturnValue) {
      try {
        await Promise.all([
          storage.setItem(key, serialize(result)),
          storage.setItem(timeKey, Date.now().toString()),
        ]);
      } catch (error) {}
    }

    async function revalidate() {
      try {
        const result = await fn();

        // Intentionally persisting asynchronously and not blocking since there is
        // in any case a chance for a race condition to occur when using an external
        // persistence store, like Redis, with multiple consumers. The impact is low.
        persistValue(result);

        return result;
      } catch (error) {
        throw error;
      }
    }

    const {cachedValue, cachedAge} = await retrieveCachedValue();

    if (!isNil(cachedValue)) {
      if (cachedAge >= staleTime) {
        // Non-blocking so that revalidation runs while stale cache data is returned
        // Error handled in `revalidate` by emitting an event, so only need a no-op here
        revalidate()
          .then(updateFn)
          .catch(() => {});
      }
      return Promise.resolve(cachedValue as ReturnValue);
    }

    return revalidate();
  }

  return staleWhileRevalidate;
}

type Fn = (...args: any[]) => any;

export const isFunction = (value: any): value is Fn =>
  typeof value === 'function';

type Nil = null | undefined;

export const isNil = (value: any): value is Nil =>
  typeof value === 'undefined' || value === null;

export const isPlainObject = (value: any) =>
  !!value && typeof value === 'object' && !Array.isArray(value);

export const passThrough = (value: any) => value;

export function parseConfig(config: Config) {
  if (!isPlainObject(config)) {
    throw new Error('Config is required');
  }

  const storage = config.storage;

  if (
    !isPlainObject(storage) ||
    !isFunction(storage.getItem) ||
    !isFunction(storage.setItem)
  ) {
    throw new Error(
      'Storage is required and should satisfy the Config["storage"] type',
    );
  }

  const staleTime = config.staleTime || 0;
  const cacheTime =
    Math.min(config.cacheTime!, Number.MAX_SAFE_INTEGER) || Infinity;
  const serialize = isFunction(config.serialize)
    ? config.serialize
    : passThrough;
  const deserialize = isFunction(config.deserialize)
    ? config.deserialize
    : passThrough;

  if (staleTime >= cacheTime) {
    throw new Error('staleTime must be less than cacheTime');
  }

  return {
    storage,
    staleTime,
    cacheTime,
    serialize,
    deserialize,
  };
}
