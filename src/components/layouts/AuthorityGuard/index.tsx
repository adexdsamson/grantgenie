import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuthentication } from "@/hooks/useAuthentication";
// import { useUserAuthority } from "@/hooks/useUserAuthority";

type AuthorityGuard = { children: ReactNode };


const AuthorityGuard = (props: AuthorityGuard) => {
  const { children } = props;
  // const location = useLocation();

  const isAuthenticated = useAuthentication();
  

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // return true ? children : <Navigate to="/dashboard/dispute-log" />;
  return children;
};

export default AuthorityGuard;
