import { renderHook } from "@testing-library/react-hooks";

import { useEffectOnce } from "./useEffectOnce";

describe("useEffectOnce", () => {
  it("runs provided effect only once", () => {
    const effectCallback = jest.fn().mockReturnValue(jest.fn());

    const { rerender } = renderHook(() => useEffectOnce(effectCallback));

    expect(effectCallback).toHaveBeenCalledTimes(1);

    rerender();

    expect(effectCallback).toHaveBeenCalledTimes(1);
  });

  it("runs provided clean-up on unmount", () => {
    const effectCleanup = jest.fn();
    const effectCallback = jest.fn().mockReturnValue(effectCleanup);

    const { unmount } = renderHook(() => useEffectOnce(effectCallback));

    expect(effectCleanup).not.toHaveBeenCalled();

    unmount();

    expect(effectCleanup).toHaveBeenCalledTimes(1);
  });
});
