import React, { Children, Component } from "react";
import MainLayout from "../layouts/MainLayout";
import TodoList from "../pages/admin/TodoList";
import ImportantTodos from "../pages/admin/ImportantTodos";
import TodoDetail from "../pages/admin/TodoDetail";
import CreateTodos from "../pages/admin/CreateTodos";
import EditTodos from "../pages/admin/EditTodos";
import loginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";


const AuthRoute = [
  {
    path: "/",
    Component: MainLayout,
    children: [
      
      { path: "login", Component: loginPage },
      { path: "register", Component: RegisterPage },
      
    ],
  },
];

export default AuthRoute;