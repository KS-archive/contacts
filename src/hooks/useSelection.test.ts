import { act, renderHook } from "@testing-library/react-hooks";

import { useSelection } from "./useSelection";

describe("useSelection", () => {
  it("initializes with empty selection", () => {
    const { result } = renderHook(() => useSelection());

    expect(result.current.selectedIds).toEqual([]);
    expect(result.current.selectionCount).toBe(0);
  });

  it("allows to select and deselect by providing IDs", () => {
    const { result } = renderHook(() => useSelection());

    act(() => {
      result.current.select("1");
      result.current.select("8");
      result.current.select("20");
    });

    expect(result.current.selectedIds).toEqual(["1", "8", "20"]);
    expect(result.current.selectionCount).toBe(3);

    act(() => {
      result.current.deselect("1");
      result.current.deselect("20");
    });

    expect(result.current.selectedIds).toEqual(["8"]);
    expect(result.current.selectionCount).toBe(1);
  });

  it("doesn't allow to set the same ID many times", () => {
    const { result } = renderHook(() => useSelection());

    act(() => {
      result.current.select("1");
      result.current.select("1");
    });

    expect(result.current.selectedIds).toEqual(["1"]);
    expect(result.current.selectionCount).toBe(1);
  });
});
