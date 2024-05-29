import { Navigate, Outlet } from "react-router-dom";
export const PrivateNavigation = ({ isAuthenticated }) => {
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export const PublicNavigation = () => {
  const isAuthenticated = true;
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
