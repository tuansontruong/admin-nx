import { cloneElement, useEffect, useState } from 'react';
import { LoadingSpinner } from '@components';

export const NavigateRoute = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(false);
      }, 1500);
    }).then((res) => setIsLoading(false));
  }, []);
  if (isLoading) return <LoadingSpinner />;
  return cloneElement(children);
};
