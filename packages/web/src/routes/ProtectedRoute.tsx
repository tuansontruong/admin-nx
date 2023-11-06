import { Navigate } from 'react-router-dom';
import { cloneElement, useEffect, useState } from 'react';
import { LoadingSpinner } from '../components';

import { PATHS } from './constants';
import { validateToken } from './ProtectedRoute.service';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [roles, setRoles] = useState<object>();

  useEffect(() => {
    validateToken()
      .then(
        (res) => new Promise((resolve) => setTimeout(() => resolve(res), 1500)),
      )
      .then((res) => {
        if (!res) window.location.href = PATHS.LOGIN_PATH;
        else setRoles(res);
      });
  }, []);

  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    return <Navigate to={PATHS.LOGIN_PATH} />;
  }

  if (!roles) {
    return <LoadingSpinner />;
  }

  return cloneElement(children, { roles });
};
