/**
 * {@link LazyPromise} is a utility for lazy initialization of values.
 *
 * Supports both synchronous and asynchronous initialization. Ensures that the
 * value is computed only once and cached for future access. Uses a mutex to
 * prevent duplicate computation.
 */
export class LazyPromise<T> implements Promise<T> {
  readonly [Symbol.toStringTag] = "LazyPromise";

  private readonly get: () => Promise<T>;
  private promise: Promise<T> | null;

  /**
   * Creates a new {@link LazyPromise} instance.
   *
   * @param get - A function that computes the value.
   */
  constructor(get: () => Promise<T>) {
    this.get = get;
    this.promise = null;
  }

  /**
   * {@link LazyPromise.value} creates a Lazy instance that holds a precomputed value.
   *
   * @param value - The value to wrap in a Lazy instance.
   * @returns A {@link LazyPromise} instance that immediately resolves to `value`.
   */
  static value<T>(value: T): LazyPromise<T> {
    return new LazyPromise(async () => value);
  }

  /**
   * {@link value} retrieves the lazily initialized value, computing it if
   * necessary. Ensures that only one computation occurs, even in concurrent
   * calls.
   *
   * @returns A promise resolving to the value.
   */
  get value(): Promise<T> {
    if (this.promise !== null) {
      return this.promise;
    }
    this.promise = this.get();
    return this.promise;
  }

  /**
   * {@link later} transforms the value inside Lazy using a provided function.
   * The transformation is deferred until the value is accessed.
   *
   * @param fn - A function to transform the computed value.
   * @returns A new Lazy instance containing the transformed value.
   */
  later<U>(fn: (value: T) => U): LazyPromise<U> {
    return new LazyPromise(async () => {
      const value = await this.value;
      return fn(value);
    });
  }

  /**
   * {@link reset} resets the cached value forcing a recomputation on next
   * access. This does not affect any existing promises that were already
   * awaited.
   */
  reset(): void {
    this.promise = null;
  }

  then<TResult1 = T, TResult2 = never>(
    onFulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onRejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null,
  ): Promise<TResult1 | TResult2> {
    return this.value.then(onFulfilled, onRejected);
  }

  finally: typeof this.value.finally = (onFinally) => {
    return this.value.finally(onFinally);
  };

  catch: typeof this.value.catch = (onRejected) => {
    return this.value.catch(onRejected);
  };
}
