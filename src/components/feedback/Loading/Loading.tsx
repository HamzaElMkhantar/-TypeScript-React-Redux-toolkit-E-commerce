import { Spinner } from "react-bootstrap";
import { ELoadingState } from "src/types/shared";

interface ILoading {
  status: ELoadingState;
  error: string | null;
  children: React.ReactNode;
}
function Loading({ status, error, children }: ILoading) {
  if (status === ELoadingState.Pending) {
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <Spinner
          animation="border"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    );
  }
  if (error === ELoadingState.Failed) {
    return <h2>{error}</h2>;
  }
  return <>{children}</>;
}

export default Loading;
