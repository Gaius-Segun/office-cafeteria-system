import { Navigate } from 'react-router-dom';
import { useAppContext } from './AppContext';

// This component acts as a guard for protected routes.
// It checks for a logged-in user and redirects to the login page if not authenticated.
export default function AuthWrapper({ children }) {
  const { userEmail } = useAppContext();

  // If the user is not logged in, immediately redirect to the login page.
  if (!userEmail) {
    return <Navigate to="/" replace />;
  }

  // If the user is logged in, render the child components (the protected page).
  return children;
}
