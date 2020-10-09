import { act, renderHook } from "@testing-library/react-hooks";

import { useAsyncData } from "./useAsyncData";

describe("useAsyncData", () => {
  it("initializes with empty array, no error, and idle status", () => {
    const promiseFn = jest.fn();
    const { result } = renderHook(() => useAsyncData(promiseFn));

    expect(result.current.status).toBe("idle");
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);
    expect(promiseFn).not.toBeCalled();
  });

  it("fetches array data and appends it to the current one", async () => {
    const step = 5;
    const dataArray = Array.from(Array(10).keys());
    let start = -step;

    const promiseFn = jest.fn().mockImplementation(() => {
      start += step;
      return Promise.resolve(dataArray.slice(start, start + step));
    });

    const { result, waitForNextUpdate } = renderHook(() => useAsyncData(promiseFn));

    act(() => {
      result.current.fetchMore();
    });

    expect(result.current.status).toBe("pending");

    await waitForNextUpdate();

    expect(promiseFn).toBeCalledTimes(1);
    expect(result.current.status).toBe("resolved");
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual(dataArray.slice(0, start + step));

    await act(async () => {
      result.current.fetchMore();
      await waitForNextUpdate();
    });

    expect(promiseFn).toBeCalledTimes(2);
    expect(result.current.data).toEqual(dataArray.slice(0, start + step));
  });

  it("sets error state when data fetching fails", async () => {
    const error = new Error("Something went wrong");
    const promiseFn = jest.fn().mockRejectedValue(error);

    const { result, waitForNextUpdate } = renderHook(() => useAsyncData(promiseFn));

    await act(async () => {
      result.current.fetchMore();
      await waitForNextUpdate();
    });

    expect(promiseFn).toBeCalledTimes(1);
    expect(result.current.status).toBe("rejected");
    expect(result.current.error).toEqual(error);
    expect(result.current.data).toEqual([]);
  });
});
