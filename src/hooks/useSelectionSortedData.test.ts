import { renderHook } from "@testing-library/react-hooks";

import { personBuilder } from "mocks/Person";

import { useSelectionSortedData } from "./useSelectionSortedData";

describe("useSelectionSortedData", () => {
  const data = Array.from(Array(5).keys()).map(() => personBuilder());

  it("appends `isSelected` property to provided records", () => {
    const { result } = renderHook(() => useSelectionSortedData(data, ["1", "3"]));

    expect(result.current[0]).toHaveProperty("isSelected");
    expect(result.current[1]).toHaveProperty("isSelected");
    expect(result.current[2]).toHaveProperty("isSelected");
    expect(result.current[3]).toHaveProperty("isSelected");
    expect(result.current[4]).toHaveProperty("isSelected");
  });

  it("moves selected records to the beginning of the array", () => {
    const { result } = renderHook(() => useSelectionSortedData(data, ["1", "3", "5"]));

    expect(result.current[0]).toEqual({ ...data[0], isSelected: true });
    expect(result.current[1]).toEqual({ ...data[2], isSelected: true });
    expect(result.current[2]).toEqual({ ...data[4], isSelected: true });
    expect(result.current[3]).toEqual({ ...data[1], isSelected: false });
    expect(result.current[4]).toEqual({ ...data[3], isSelected: false });
  });
});
