import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; 
import React from "react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // or a spinner
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
