import { useAppSelector } from "@store/hooks";
import { Navigate } from "react-router-dom";

const IsAuth = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector((state) => state.auth.accessToken);

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return token ? children : <Navigate to="/" replace />;
};

export default IsAuth;
