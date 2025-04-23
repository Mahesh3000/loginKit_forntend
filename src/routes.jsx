// routes.jsx
import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./containers/Login";
import SignUp from "./containers/Login/SignUp";
import Onboarding from "./containers/Onboarding";
import ForgetPassword from "./containers/Login/ForgetPassword";
import Dashboard from "./containers/Dashboard";
import NotFound from "./containers/Login/NotFound";
import ProtectedRoute from "./containers/Login/ProtectedRoute";
import Loading from "./containers/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  //   {
  //     path: "/orders",
  //     element: (
  //       <Suspense fallback={<Loading />}>
  //         <Orders />
  //       </Suspense>
  //     ),
  //   },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
