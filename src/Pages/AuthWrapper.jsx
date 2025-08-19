import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from './AppContext';

/**
 * This component acts as a guard for protected routes.
 * It now also checks for an admin role for specific admin routes.
 */
export default function AuthWrapper({ children, requiredRole }) {
  const { userEmail, userRole } = useAppContext();

  // If the user is not logged in, immediately redirect to the login page.
  if (!userEmail) {
    return <Navigate to="/" replace />;
  }

  // Check if a specific role is required for this route
  // If so, and the user doesn't have the required role, redirect to the dashboard
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  // If the user is logged in and meets the role requirements, render the children
  return children;
}
