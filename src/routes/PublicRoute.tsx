import { useAuthentication } from "@/hooks/useAuthentication";
import { Navigate, Outlet } from "react-router-dom";
import { dashboardPageRoutes } from ".";


export const PublicRoute = () => {
  const isAuthenticated = useAuthentication();
  const dashboardIndexPath = dashboardPageRoutes[0].path;
  return isAuthenticated ? <Navigate to={dashboardIndexPath} /> : <Outlet />;
};
