import { Dashboard } from "@/layouts/Dashboard";
import { ErrorFallback } from "@/components/layouts/Error";
import { ProtectedRoute } from "./PrivateRoute";
import { Route } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { NotFound } from "@/layouts/NotFound";
import { PublicRoute } from "./PublicRoute";
import { getPageRoutes } from "@/helpers";

export const authenticationPagePaths = {
  Index: "../pages/Register.tsx",
  Login: "../pages/Login",
  Verification: "../pages/Verification.tsx",
  ForgotPassword: "../pages/ForgotPassword.tsx",
} as const;

export const dashboardPagePaths = {
  Home: "../pages/DashboardPage/index.tsx",
  Projects: "../pages/Projects/index.tsx",
  Employees: "../pages/Employees/index.tsx",
  Agencies: "../pages/Agency/index.tsx",
} as const;

const pageRoutes = getPageRoutes(authenticationPagePaths);
export const dashboardPageRoutes = getPageRoutes(
  dashboardPagePaths,
  "dashboard"
);

export const routes = (
  <>
    <Route
      path="/"
      element={
        <PublicRoute />
      }
      errorElement={<NotFound />}
    >
      {pageRoutes.map((item, index) => (
        <Route
          key={index}
          path={item.path}
          element={<AuthLayout key={index} >{item.element}</AuthLayout>}
        />
      ))}
    </Route>

    <Route
      path="/dashboard"
      errorElement={<ErrorFallback />}
      element={
        <ProtectedRoute />
      }
    >
      {dashboardPageRoutes.map(
        (item, index) => (
          <Route
            key={index}
            path={item.path}
            element={
              <Dashboard key={index}>{item.element}</Dashboard>
            }
          />
        )
      )}
    </Route>
  </>
);
