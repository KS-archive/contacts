import React from "react";

import { Button } from "components/Button";
import { Loader } from "components/Loader";
import { AsyncStatus } from "typings/AsyncStatus";

import styles from "./ListFooter.module.css";

export type ListFooterProps = {
  status: AsyncStatus;
  fetchMore: () => void;
};

function FailureState({ fetchMore }: Pick<ListFooterProps, "fetchMore">) {
  return (
    <div className={styles.failureState}>
      <p>People fetching falied</p>
      <Button onClick={fetchMore}>Retry fetch</Button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className={styles.loadingState}>
      <p>Fetching people...</p>
      <Loader />
    </div>
  );
}

export function ListFooter({ status, fetchMore }: ListFooterProps) {
  return (
    <div data-testid="ListFooter" className={styles.listFooter}>
      {status === "idle" && <Button onClick={fetchMore}>Fetch data</Button>}
      {status === "pending" && <LoadingState />}
      {status === "rejected" && <FailureState fetchMore={fetchMore} />}
      {status === "resolved" && <Button onClick={fetchMore}>Fetch more</Button>}
    </div>
  );
}
