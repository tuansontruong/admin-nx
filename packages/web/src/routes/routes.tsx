import { RouteObject } from "react-router-dom";
import { Login } from "../views/auth";
import App from "../App";
import { ProtectedRoute } from "./ProtectedRoute";

const PATHS = {
  LOGIN_PATH: "/login",
  APP_PATH: "/",
};

const LoginRoute: RouteObject = {
  path: PATHS.LOGIN_PATH,
  element: <Login />,
};

const AppRoute: RouteObject = {
  path: PATHS.APP_PATH,
  element: (
    <ProtectedRoute>
      <App />
    </ProtectedRoute>
  ),
};

export { PATHS, LoginRoute, AppRoute };
