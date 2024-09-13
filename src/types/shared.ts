
export enum ELoadingState {
    Idle = "idle",
    Pending = "pending",
    Succeeded = "succeeded",
    Failed = "failed",
  }

export type TGridListProps<T> = {
    records: T[];
    render: (record: T) => React.ReactNode;
  };