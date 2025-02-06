import { describe, expect, it, vi } from "vitest";
import { LazyPromise } from "./index.js";

describe("LazyPromise", () => {
  it("should compute and return the value", async () => {
    const lazyValue = new LazyPromise(async () => "foo");
    const value = await lazyValue;
    expect(value).toEqual("foo");
  });

  it("should cache the computed value", async () => {
    const compute = vi.fn().mockResolvedValue("cached");
    const lazyValue = new LazyPromise(compute);

    await lazyValue;
    await lazyValue;
    expect(compute).toHaveBeenCalledTimes(1);
  });

  it("should work with asynchronous functions", async () => {
    const lazyValue = new LazyPromise(async () => 42);
    const value = await lazyValue;
    expect(value).toEqual(42);
  });

  it("should allow chaining with then()", async () => {
    const lazyValue = new LazyPromise(async () => "foo").then(
      (value) => value + "bar",
    );
    const value = await lazyValue;
    expect(value).toEqual("foobar");
  });

  it("should support later() transformations with sync functions", async () => {
    const lazyValue = new LazyPromise(async () => 10).later((num) => num * 2);
    expect(await lazyValue).toEqual(20);
  });

  it("should support later() transformations with async functions", async () => {
    const lazyValue = new LazyPromise(async () => 10).later(
      async (num) => num * 3,
    );
    expect(await lazyValue).toEqual(30);
  });

  it("should call the original function only once with later()", async () => {
    const compute = vi.fn().mockReturnValue(5);
    const lazyValue = new LazyPromise(compute).later(
      (num) => (num as number) * 2,
    );

    await lazyValue;
    await lazyValue;

    expect(compute).toHaveBeenCalledTimes(1);
  });

  it("should reset and recompute the value when reset() is called", async () => {
    let counter = 0;
    const lazyValue = new LazyPromise(async () => ++counter);

    expect(await lazyValue).toEqual(1);
    expect(await lazyValue).toEqual(1);

    lazyValue.reset();

    expect(await lazyValue).toEqual(2);
  });

  it("should handle errors from the computation function", async () => {
    const lazyValue = new LazyPromise(async () => {
      throw new Error("Test error");
    });

    await expect(lazyValue).rejects.toThrow("Test error");
  });

  it("should propagate errors correctly in later()", async () => {
    const lazyValue = new LazyPromise(async () => 5).later(() => {
      throw new Error("Later error");
    });

    await expect(lazyValue).rejects.toThrow("Later error");
  });
});
