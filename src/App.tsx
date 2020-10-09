import React from "react";

import { ListFooter } from "components/ListFooter";
import { PeopleList } from "components/PeopleList";
import { useAsyncData } from "hooks/useAsyncData";
import { useEffectOnce } from "hooks/useEffectOnce";
import { useSelection } from "hooks/useSelection";
import { useSelectionSortedData } from "hooks/useSelectionSortedData";

import apiData from "./api";
import styles from "./App.module.css";

function App() {
  const { status, data, fetchMore } = useAsyncData(apiData);
  const { selectedIds, select, deselect, selectionCount } = useSelection();
  const peopleData = useSelectionSortedData(data, selectedIds);

  useEffectOnce(() => {
    fetchMore();
  });

  return (
    <div className={styles.app}>
      <div className={styles.selected}>Selected contacts: {selectionCount}</div>
      <div className={styles.list}>
        <PeopleList people={peopleData} selectCard={select} deselectCard={deselect} />
        <ListFooter status={status} fetchMore={fetchMore} />
      </div>
    </div>
  );
}

export default App;
