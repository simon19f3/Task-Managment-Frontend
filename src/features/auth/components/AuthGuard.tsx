import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 
import type { UserRole } from '../types';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>; // Or a Spinner component

  if (!user) {
    // Redirect to login but save the current location they were trying to go to
    return <Navigate to="/auth/register" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is logged in but doesn't have the right permissions
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};