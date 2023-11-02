import { Navigate } from "react-router-dom";
import { cloneElement, useEffect, useState } from "react";

import { PATHS } from "./constants";
import { validateToken } from "./ProtectedRoute.service";
import { LoadingSpinner } from "../commons";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    return <Navigate to={PATHS.LOGIN_PATH} />;
  }

  const [permissions, setPersmissions] = useState<{} | null>(null);

  useEffect(() => {
    validateToken()
      .then(
        (res) => new Promise((resolve) => setTimeout(() => resolve(res), 1500))
      )
      .then((res) => {
        if (!res) window.location.href = PATHS.LOGIN_PATH;
        else setPersmissions(res);
      });
  }, []);

  if (!permissions) {
    return <LoadingSpinner />;
  }

  return cloneElement(children, { permissions });
};
