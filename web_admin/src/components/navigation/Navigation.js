import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getAccessTokenState } from "../../store/selector";
import PerfectScrollbar from "react-perfect-scrollbar";
import "./Navigation.scss";
const PublicNavigation = () => {
  const accessToken = useSelector(getAccessTokenState);
  if (accessToken) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

const PrivateNavigation = () => {
  const accessToken = useSelector(getAccessTokenState);
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="content-main">
      <PerfectScrollbar>
        <Outlet />
      </PerfectScrollbar>
    </div>
  );
};

export { PublicNavigation, PrivateNavigation };
