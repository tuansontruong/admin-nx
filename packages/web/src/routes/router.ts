import { createBrowserRouter } from "react-router-dom";
import { AppRoute, LoginRoute } from "./routes";

export const router = createBrowserRouter([AppRoute, LoginRoute]);
