import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {

    return <Navigate to="/auth" />;
  }

  return children; // If token exists, render the children components (the protected page)
};

export default ProtectedRoute;