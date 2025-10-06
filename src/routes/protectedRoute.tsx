import React from "react";
import { Navigate } from "react-router-dom";
import { ErrorBoundary } from "../context/ErrorBoundary";
import { useAuth } from "../context/AuthProvider/auth"; 
import { LoadingSpinner } from "../components/common/loader/Loader";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="h-screen w-screen"><LoadingSpinner text="Loading...."/></div>; 
  }

  if (!user) {
    return <Navigate to="/" replace />; 
  }

  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
};

export default ProtectedRoute;
