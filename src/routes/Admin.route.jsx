import React, { Children, Component } from "react";
import MainLayout from "../layouts/MainLayout";
import TodoList from "../pages/admin/TodoList";
import ImportantTodos from "../pages/admin/ImportantTodos";
import TodoDetail from "../pages/admin/TodoDetail";
import CreateTodos from "../pages/admin/CreateTodos";
import EditTodos from "../pages/admin/EditTodos";
import { Navigate } from "react-router-dom";


const AdminRoute = [
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, element: <Navigate to={"/login"} /> },
      { path: "todos", Component: TodoList },
      { path: "important", Component: ImportantTodos },
      { path: "todos/:id", Component: TodoDetail },
      { path: "todos/add", Component: CreateTodos },
      { path: "todos/edit/:id", Component: EditTodos },
    ],
  },
];

export default AdminRoute;