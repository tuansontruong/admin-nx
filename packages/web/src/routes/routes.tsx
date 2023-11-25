import { RouteObject } from 'react-router-dom';

import { Users, Login, Dashboard, Products } from '@views';

import App from '../App';
import { PATHS } from './constants';
import { ProtectedRoute } from './ProtectedRoute';
import { NavigateRoute } from './NavigateRoute';

const LoginRoute: RouteObject = {
  path: PATHS.LOGIN_PATH,
  element: (
    <NavigateRoute>
      <Login />
    </NavigateRoute>
  ),
};

// const UserRoute: RouteObject = {
//   path: PATHS.USER_PATH,
//   element: (
//     <ProtectedRoute>
//       <Users />
//     </ProtectedRoute>
//   ),
// };

const DashboardRoute: RouteObject = {
  path: PATHS.DASH_BOARD_PATH,
  element: (
    // <ProtectedRoute>
    <Dashboard />
    // </ProtectedRoute>
  ),
};

const ProductsRoute: RouteObject = {
  path: PATHS.PRODUCT_PATH,
  element: (
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  ),
};

const AppRoute: RouteObject = {
  path: PATHS.APP_PATH,
  element: (
    <ProtectedRoute>
      <App roles={['']} />
    </ProtectedRoute>
  ),
  children: [DashboardRoute, ProductsRoute],
};

export { LoginRoute, AppRoute };
