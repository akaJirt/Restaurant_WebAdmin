import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getAccessTokenState } from "../../store/selector";

const PublicNavigation = () => {
  const accessToken = useSelector(getAccessTokenState);
  console.log(accessToken, "<<<<<<<<<<<<<<<<<<");
  if (accessToken) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
const PrivateNavigation = () => {
  const accessToken = useSelector(getAccessTokenState);
  console.log(accessToken, "<<<<<<<<<<<<<<<<<<");
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export { PublicNavigation, PrivateNavigation };
