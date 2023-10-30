import { Navigate } from "react-router-dom";
import { PATHS } from "./routes";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    return <Navigate to={PATHS.LOGIN_PATH} />;
  }

  //call api to validate access token;
  const isAccessTokenValidated = true;

  if (!isAccessTokenValidated) {
    localStorage.removeItem("access_token");
    return <Navigate to={PATHS.LOGIN_PATH} />;
  }

  return children;
};
