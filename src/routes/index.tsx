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
  Login: '../pages/Login',
  Verification: "../pages/Verification.tsx",
  ForgotPassword: "../pages/ForgotPassword.tsx",

} as const

export const dashboardPagePaths = {
  Home: "../pages/DashboardPage",
  Projects: '../pages/Projects/index.tsx',
  Employees: '../pages/Employees/index.tsx',
} as const

const pageRoutes = getPageRoutes(authenticationPagePaths);
export const dashboardPageRoutes = getPageRoutes(dashboardPagePaths, "dashboard");

export const routes = (
  <>
    <Route
      path="/"
      element={<AuthLayout />}
      errorElement={<NotFound></NotFound>}
    >
      {pageRoutes.map((item, index) => (
        <Route
          key={index}
          path={item.path}
          element={<PublicRoute key={index}>{item.element}</PublicRoute>}
        />
      ))}
    </Route>

    <Route
      path="/dashboard"
      errorElement={<ErrorFallback />}
      element={<Dashboard />}
    >
      {dashboardPageRoutes.map(
        (item, index) => (
          <Route
            key={index}
            path={item.path}
            element={
              <ProtectedRoute key={index}>{item.element}</ProtectedRoute>
            }
          />
        )
      )}
    </Route>
  </>
);
