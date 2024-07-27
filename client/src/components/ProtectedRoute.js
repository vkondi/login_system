import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  return authenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
