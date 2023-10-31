import { RouteObject } from "react-router-dom";

import { PATHS } from "./constants";

// routes configs
import App from "../App";
import { ProtectedRoute } from "./ProtectedRoute";
import { Users, Login } from "../views";

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

const AppRoute: RouteObject = {
  path: PATHS.APP_PATH,
  element: (
    <ProtectedRoute>
      <App />
    </ProtectedRoute>
  ),
  //   children: [UserRoute],
};

export { LoginRoute, AppRoute, UserRoute };
