import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLoginState } from "../../store/selector";

const ProtectedRoute = () => {
  const loginState = useSelector(getLoginState);
  console.log(loginState);
  if (!loginState.isLogin || Object.keys(loginState.isLogin).length === 0) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
