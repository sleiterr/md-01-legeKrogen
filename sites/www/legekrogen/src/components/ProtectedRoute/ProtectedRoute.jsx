import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [token] = useState(() => localStorage.getItem("token"));

  if (!token) return <Navigate to="/login" replace />;

  let user;
  try {
    user = jwtDecode(token);
  } catch {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};
export default ProtectedRoute;
