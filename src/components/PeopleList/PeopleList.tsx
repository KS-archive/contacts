import React, { useCallback, useRef } from "react";
import { VirtualItem } from "react-virtual/types";

import { PersonInfo } from "components/PersonInfo";
import { useVirtualWindow } from "hooks/useVirtualWindow";
import { Person } from "typings/Person";

import styles from "./PeopleList.module.css";

export type PeopleListProps = {
  people: (Person & { isSelected: boolean })[];
  selectCard: (id: string) => void;
  deselectCard: (id: string) => void;
};

export function PeopleList({ people, selectCard, deselectCard }: PeopleListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualWindow({
    size: people.length,
    parentRef,
    estimateSize: useCallback(() => 180, []),
    overscan: 5,
  });

  const renderVirtualItem = (virtualItem: VirtualItem) => {
    const { isSelected, ...personInfo } = people[virtualItem.index];

    return (
      <PersonInfo
        key={personInfo.id}
        data={personInfo}
        isSelected={isSelected}
        onClick={isSelected ? deselectCard : selectCard}
        className={styles.virtualItem}
        style={{ transform: `translateY(${virtualItem.start}px)` }}
      />
    );
  };

  return (
    <div
      data-testid="PeopleList"
      ref={parentRef}
      className={styles.virtualList}
      style={{ height: `${rowVirtualizer.totalSize}px` }}
    >
      {rowVirtualizer.virtualItems.map(renderVirtualItem)}
    </div>
  );
}
