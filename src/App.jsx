import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./containers/Login/index";
import ProtectedRoute from "./containers/Login/ProtectedRoute";
import SignUp from "./containers/Login/SignUp";
import NotFound from "./containers/Login/NotFound";
import Onboarding from "./containers/Onboarding";
import ForgetPassword from "./containers/Login/ForgetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

{
  /* <Route path="/dashboard" {<ProtectedRoute element={<Onboarding />} />}/> */
}

{
  /* <Route
  path="/orders"
  element={<ProtectedRoute element={<Orders />} />}
/> */
}
