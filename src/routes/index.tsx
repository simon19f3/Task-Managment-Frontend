// src/routes/index.tsx
import { AuthGuard } from '../features/auth/components/AuthGuard';
import  ProtectedLayout  from '../layouts/ProtectedLayout';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import  LoginPage  from '../pages/auth/LoginPage';
import  UserDashboard  from '../pages/dashboard/UserDashboard';
import  AdminDashboard  from '../pages/dashboard/AdminDashboard';
import RegisterPage from '../pages/auth/RegisterPage';
import UserTaskDetail from '@/pages/detailpage/taskDetailUser';
import AdminTaskDetail from '@/pages/detailpage/taskDetailAdmin';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

const RoleIndexRedirect = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null; // Or a loading spinner

  // Best Practice: Redirect based on role
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  return <Navigate to="/dashboard" replace />;
};


const router = createBrowserRouter([
  {
    path: '/auth/register',
    element: <RegisterPage />,
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    path: '/', 
    element: (
      <AuthGuard>
        <ProtectedLayout />
      </AuthGuard>
    ),
    children: [
      // --- USER ROUTES ---
      {
        index: true, // Matches exactly "/"
        element: <RoleIndexRedirect />,
      },
      {
        path: 'dashboard',
        element: <AuthGuard allowedRoles={[ 'member']}><Outlet /></AuthGuard>,// Just render the nested routes
        children: [
          {
            index: true, // Matches exactly "/dashboard"
            element: <UserDashboard />,
          },
          {
            path: 'task/:id', // Matches "/dashboard/task/:id"
            element: <UserTaskDetail />,
          },
        ],
      },

      // --- ADMIN ROUTES ---
      {
        path: 'admin',
        // Wrapping the group in a Guard
        element: <AuthGuard allowedRoles={['admin']}><Outlet /></AuthGuard>,
        // element: <Outlet />, Just render the nested routes 
        children: [
          {
            index: true, // Matches exactly "/admin"
            element: <AdminDashboard />,
          },
          {
            path: 'task/:id', // Matches "/admin/task/:id"
            element: <AdminTaskDetail />,
          },
        ],
      },
    ],
  },
]);
export { router };