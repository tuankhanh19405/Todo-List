import MainLayout from "../layouts/MainLayout";
import TodoList from "../pages/admin/TodoList";
import ImportantTodos from "../pages/admin/ImportantTodos";
import TodoDetail from "../pages/admin/TodoDetail";
import CreateTodos from "../pages/admin/CreateTodos";
import EditTodos from "../pages/admin/EditTodos";
import ProtectedRoute from "../components/ProtectedRoute"; // Import ProtectedRoute
import { Navigate } from "react-router-dom";

const AdminRoute = [
  {
    path: "/",
    element: <MainLayout />, // Sử dụng element thay Component
    children: [
      // { index: true, element: <Navigate to="/login" /> }, 
      {
        path: "",
        element: (
          <ProtectedRoute requiresAuth={true}>
            <TodoList />
          </ProtectedRoute>
        ), // Thêm requiresAuth={true}
      },
      {
        path: "important",
        element: (
          <ProtectedRoute requiresAuth={true}>
            <ImportantTodos />
          </ProtectedRoute>
        ),
      },
      {
        path: "todos/:id",
        element: (
          <ProtectedRoute requiresAuth={true}>
            <TodoDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "todos/add",
        element: (
          <ProtectedRoute requiresAuth={true}>
            <CreateTodos />
          </ProtectedRoute>
        ),
      },
      {
        path: "todos/edit/:id",
        element: (
          <ProtectedRoute requiresAuth={true}>
            <EditTodos />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default AdminRoute;