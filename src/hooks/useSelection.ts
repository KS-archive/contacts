import { useState } from "react";

export function useSelection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function select(selectedId: string) {
    setSelectedIds((prev) => (prev.includes(selectedId) ? prev : [...prev, selectedId]));
  }

  function deselect(deselectedId: string) {
    setSelectedIds((prev) => prev.filter((id) => deselectedId !== id));
  }

  return {
    selectedIds,
    selectionCount: selectedIds.length,
    select,
    deselect,
  };
}
