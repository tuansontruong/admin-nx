import React, { useContext } from 'react';

interface IUserConfig {
  userConfig: {
    roles?: string[];
  };
  children: React.ReactNode;
}

const UserConfigContext = React.createContext({});

export const UserConfigProvider = ({ userConfig, children }: IUserConfig) => {
  return (
    <UserConfigContext.Provider value={userConfig}>
      {children}
    </UserConfigContext.Provider>
  );
};

export const useUserConfig = () => {
  const routerConfig = useContext(UserConfigContext);
  return routerConfig;
};
