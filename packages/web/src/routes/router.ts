import { createBrowserRouter } from "react-router-dom";
import { AppRoute, LoginRoute, UserRoute } from "./routes";

export const router = createBrowserRouter([AppRoute, LoginRoute, UserRoute]);
