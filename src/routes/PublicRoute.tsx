import { useAuthentication } from "@/hooks/useAuthentication";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { dashboardPageRoutes } from ".";

type ProtectedRoute = {
  children: ReactNode;
};

export const PublicRoute = (props: ProtectedRoute) => {
  const isAuthenticated = useAuthentication();
  const dashboardIndexPath = dashboardPageRoutes[0].path;
  return isAuthenticated ? <Navigate to={dashboardIndexPath} /> : props.children;
};
