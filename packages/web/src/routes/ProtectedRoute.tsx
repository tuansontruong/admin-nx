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

  // const { permissions, isAccessTokenValidated } =
  //   validateAccessToken(accessToken);

  // if (!isAccessTokenValidated) {
  //   localStorage.removeItem("access_token");
  //   return <Navigate to={PATHS.LOGIN_PATH} />;
  // }

  return children;
};

const validateAccessToken = async (
  accessToken: string
): Promise<{ permissions: any; isAccessTokenValidated: boolean }> => {
  const response = await fetch("http://localhost:3000/validate-token", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  if (data.status === "success") {
    return {
      permissions: data.permissions,
      isAccessTokenValidated: true,
    };
  }
  return {
    permissions: null,
    isAccessTokenValidated: false,
  };
};
