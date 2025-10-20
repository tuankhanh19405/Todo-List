import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminRoute from "./Admin.route";
import AuthRoute from "./Auth.route";
import NotFound from "../pages/admin/NotFound"

let route = createBrowserRouter([
  ...AdminRoute,
  ...AuthRoute,
  { path: "*", Component: NotFound },
]);

const AppRouter = () => {
  return <RouterProvider router={route} />;
};

export default AppRouter;