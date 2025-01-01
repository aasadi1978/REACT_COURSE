import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
// import UserList from "./UserList";
// import ContactPage from "./ContactPage";
import UserDetail from "./UserDetail";
import Layout from "./Layout";
import UsersPage from "./UsersPage";
import ErrorPage from "./ErrorPage";
import LoginPage from "./LoginPage";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    // The home page is a child of the layout component thus it will be rendered inside the layout component
    // Note that the path property in child routes is relative to the parent route and does not start with a slash
    children: [
      //We can replace { path: "", element: <HomePage /> } by { index: true, element: <HomePage /> }
      { index: true, element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "users", element: <UsersPage /> },
    ],
  },
  {
    element: <PrivateRoutes />,
    // The children of the layout route are the routes that require authentication
    children: [
      {
        path: "users",
        element: <UsersPage />,
        children: [{ path: ":id", element: <UserDetail /> }],
      },
    ],
  },
]);

export default router;
