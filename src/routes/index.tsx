// src/routes/index.tsx
import { Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { LoadingSpinner } from "../components/common/loader/Loader";
import { DashBoardLayout } from "../Layout/DashboardLayout";
import { Items } from "../Pages/dashBoard/items";
import { Transactions } from "../Pages/dashBoard/Transactions";
import { Analytics } from "../Pages/dashBoard/analytics";
import { Dashboard } from "../Pages/dashBoard/dashBoard";
import { Orders } from "../Pages/dashBoard/order";
import { Settings } from "../Pages/dashBoard/settings";
import AuthPage from "../components/modules/auth/signInPage";
import SignUp from "../components/modules/auth/signUp";
import ProtectedRoute from "./protectedRoute";
import Investments from "../Pages/dashBoard/invest";
import AddFund from "../Pages/dashBoard/addFund";
import AddSavings from "../Pages/dashBoard/addSavings";

const router = createBrowserRouter([

  {
    path: "/",
    element: <Navigate to="/signIn" replace />,
  },
  {
    path: "/signIn",
    element: <AuthPage />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },


  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashBoardLayout>
          <Dashboard />
        </DashBoardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/analytics",
    element: (
      <ProtectedRoute>
        <DashBoardLayout>
          <Analytics />
        </DashBoardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <DashBoardLayout>
          <Settings />
        </DashBoardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/transactions",
    element: (
      <ProtectedRoute>
        <DashBoardLayout>
          <Transactions />
        </DashBoardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/items",
    element: (
      <ProtectedRoute>
        <DashBoardLayout>
          <Items />
        </DashBoardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <DashBoardLayout>
          <Orders />
        </DashBoardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-fund",
    element: (
      <ProtectedRoute>
        <DashBoardLayout>
          <AddFund />
        </DashBoardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-savings",
    element: (
      <ProtectedRoute>
        <DashBoardLayout>
          <AddSavings />
        </DashBoardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/invest",
    element: (
      <ProtectedRoute>
        <DashBoardLayout>
          <Investments />
        </DashBoardLayout>
      </ProtectedRoute>
    ),
  },


  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center">
          <LoadingSpinner text="Loading..." />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};
