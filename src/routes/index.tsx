import { Dashboard } from "@/layouts/Dashboard";
import { ErrorFallback } from "@/components/layouts/Error";
import { ProtectedRoute } from "./PrivateRoute";
import { Route } from "react-router-dom";
import { AuthLayout } from "@/layouts/AuthLayout";
import { NotFound } from "@/layouts/NotFound";
import { PublicRoute } from "./PublicRoute";
import { getPageRoutes } from "@/helpers";

import { Index } from "../pages/Register";
import { Login } from "../pages/Login";
import { Verification } from "../pages/Verification";
import { ForgotPassword } from "../pages/ForgotPassword";

import { Home } from "@/pages/DashboardPage";
import { Projects } from "@/pages/Projects";
import { Employees } from "@/pages/Experts";
import { Agencies } from "@/pages/Agency";
import { ProjectDetail } from "@/pages/Projects/Details";
import Billing from "@/pages/Billing";
import { Opportunity } from "@/pages/Opportunities";

export const authenticationPagePaths = {
  Index: "../pages/Register.tsx",
  Login: "../pages/Login",
  Verification: "../pages/Verification.tsx",
  ForgotPassword: "../pages/ForgotPassword.tsx",
} as const;

export const dashboardPagePaths = {
  Home: "../pages/DashboardPage/index.tsx",
  Opportunity: "../pages/Opportunities/index.tsx",
  Agencies: "../pages/Agency/index.tsx",
  Experts: "../pages/Experts/index.tsx",
  Projects: "../pages/Projects/index.tsx",
  Billing: "../pages/Billing/index.tsx",
} as const;

// const pageRoutes = getPageRoutes(authenticationPagePaths);
export const dashboardPageRoutes = getPageRoutes(
  dashboardPagePaths,
  "dashboard"
);


const publicRoutes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verification",
    element: <Verification />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
];

const privateRoutes = [
  {
    path: "/dashboard/home",
    element: <Home />,
  },
  {
    path: "/dashboard/projects",
    element: <Projects />,
  },
  {
    path: "/dashboard/employees",
    element: <Employees />,
  },
  {
    path: "/dashboard/agencies",
    element: <Agencies />,
  },
  {
    path: "/dashboard/projects/:id/welcome",
    element: <ProjectDetail />,
  },
  {
    path: "/dashboard/billing",
    element: <Billing />,
  },
  {
    path: "/dashboard/opportunity",
    element: <Opportunity />,
  }
];

export const routes = (
  <>
    <Route path="/" element={<PublicRoute />} errorElement={<NotFound />}>
      {publicRoutes.map((item, index) => (
        <Route
          key={index}
          path={item.path}
          element={<AuthLayout key={index}>{item.element}</AuthLayout>}
        />
      ))}
    </Route>

    <Route
      path="/dashboard"
      errorElement={<ErrorFallback />}
      element={<ProtectedRoute />}
    >
      {privateRoutes.map((item, index) => (
        <Route
          key={index}
          path={item.path}
          element={<Dashboard key={index}>{item.element}</Dashboard>}
        />
      ))}
    </Route>
  </>
);
