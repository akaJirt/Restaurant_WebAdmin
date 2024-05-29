import { Navigate, Outlet } from "react-router-dom";
export const PrivateNavigation = ({ isAuthenticated }) => {
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export const PublicNavigation = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
