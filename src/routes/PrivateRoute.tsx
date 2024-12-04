import AuthorityGuard from "@/components/layouts/AuthorityGuard";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

type ProtectedRoute = {
  children: ReactNode;
};

export const ProtectedRoute = () => {
  return (
    <AuthorityGuard>
      <Outlet />
    </AuthorityGuard>
  );
};
