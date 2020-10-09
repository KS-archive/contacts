import { useMemo } from "react";

type WithSelection<T> = T & { isSelected: boolean };

type SelectionAcc<T> = { selected: WithSelection<T>[]; nonSelected: WithSelection<T>[] };

export function useSelectionSortedData<T extends { id: string }>(data: T[], selectedIds: string[]) {
  const selectionSortedData = useMemo(() => {
    const { selected, nonSelected } = data.reduce<SelectionAcc<T>>(
      (acc, item) => {
        if (selectedIds.includes(item.id)) {
          acc.selected.push({ ...item, isSelected: true });
        } else {
          acc.nonSelected.push({ ...item, isSelected: false });
        }

        return acc;
      },
      { selected: [], nonSelected: [] },
    );

    return [...selected, ...nonSelected];
  }, [selectedIds, data]);

  return selectionSortedData;
}
