import { Navigate } from "react-router-dom";
import { cloneElement, useEffect, useState } from "react";
import { PATHS } from "./constants";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    return <Navigate to={PATHS.LOGIN_PATH} />;
  }

  const [permissions, setPersmission] = useState(null);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const tokenPromise = await fetch("http://localhost:3000/validate-token", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await tokenPromise.json();

      if (tokenPromise.status === 200 && data.permissions?.length) {
        setPersmission(data.permissions);
      }
      setIsValidating(false);
    };
    validateToken();
  }, []);

  if (isValidating) {
    return <div>Validating...</div>;
  }

  if (!permissions) {
    localStorage.removeItem("access_token");
    return <Navigate to={PATHS.LOGIN_PATH} />;
  }

  return cloneElement(children, { permissions });
};
