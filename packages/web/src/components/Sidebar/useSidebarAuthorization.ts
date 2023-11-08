export const useSidebarAuthorization = (roles: string[]) => {
  if (roles.includes('admin')) {
    return {
      dashboard: true,
      users: true,
      products: true,
      orders: true,
      settings: true,
    };
  } else {
    return {
      dashboard: true,
      users: false,
      products: false,
      orders: false,
      settings: false,
    };
  }
};
