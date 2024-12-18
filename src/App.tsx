import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { routes } from "@/routes";
import { Suspense } from "react";
import { useProviders } from "./hooks/useProviders";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorFallback } from "@/components/layouts/Error";
import { Providers } from "@/hooks/useProviders/type";
import * as Sentry from "@sentry/react";
import './App.css'
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter(createRoutesFromElements(routes));

  const providers: Providers = {
    types: Sentry.ErrorBoundary,
    props: { fallback: ErrorFallback },
    children: [
      {
        types: Suspense,
        props: {
          fallback: (
            <div className="flex flex-auto items-center justify-center flex-col min-h-[100vh]">
             <div className="loader"></div>
            </div>
          ),
        },
        children: [
          {
            types: QueryClientProvider,
            props: { client: queryClient },
            children: [
              {
                types: TooltipProvider,
                props: {},
                children: [
                  {
                    types: RouterProvider,
                    props: { router },
                  },
                ]
              }
            ],
          },
        ],
      },
      {
        types: Toaster,
        props: {},
      },
    ],
  };

  return useProviders(providers);
}

export default App;
