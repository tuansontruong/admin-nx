import { RouteObject } from 'react-router-dom';

import { Users, Login, Dashboard } from '@views';

import App from '../App';
import { PATHS } from './constants';
import { ProtectedRoute } from './ProtectedRoute';

const LoginRoute: RouteObject = {
  path: PATHS.LOGIN_PATH,
  element: <Login />,
};

// TODO: put this route as child of AppRoute after styling the sidebar
const UserRoute: RouteObject = {
  path: PATHS.USER_PATH,
  element: (
    <ProtectedRoute>
      <Users />
    </ProtectedRoute>
  ),
};

const DashboardRoute: RouteObject = {
  path: PATHS.DASH_BOARD_PATH,
  element: (
    <ProtectedRoute>
      <Dashboard />
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
  children: [DashboardRoute, UserRoute],
};

export { LoginRoute, AppRoute };
