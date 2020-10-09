import { useState } from "react";

import { AsyncStatus } from "typings/AsyncStatus";

type State<T> = {
  status: AsyncStatus;
  data: T[];
  error: Error | null;
};

export type AsyncData<T> = State<T> & {
  fetchMore: () => void;
};

export function useAsyncData<T>(asyncCall: () => Promise<T[]>): AsyncData<T> {
  const [state, setState] = useState<State<T>>({ status: "idle", data: [], error: null });

  async function fetchMore() {
    setState((prev) => ({ ...prev, status: "pending", error: null }));

    try {
      const data = await asyncCall();
      setState((prev) => ({ ...prev, status: "resolved", data: [...prev.data, ...data] }));
    } catch (ex) {
      setState((prev) => ({ ...prev, status: "rejected", error: ex }));
    }
  }

  return {
    ...state,
    fetchMore,
  };
}
