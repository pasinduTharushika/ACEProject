import { Navigate } from "react-router-dom";
import { Layout } from "../../pages/ACElayout/ACElayout";
import { isAuthenticated } from "../../services/auth.service";
import React from "react";

export const ProtectedRoute = ({ children }: { children: any }) => {
  if (isAuthenticated()) return   <Layout>{children}</Layout>;
  else if (!isAuthenticated()) return <Navigate to="/login" />;
  else return null;
};
