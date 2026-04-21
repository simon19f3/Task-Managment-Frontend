import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';
import { authService } from '../services/api';
import type { LoginCredentials, RegisterCredentials } from '../services/api';


export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { login: loginContext, logout: logoutContext, user, isLoading} = context;

  /**
   * Login Mutation
   * Handles the asynchronous state of the login request
   */
  const registerMutation = useMutation({
    mutationFn: (credentials: RegisterCredentials) => authService.register(credentials),
    onSuccess: (data) => {
      loginContext(data.access_token, data.user);
      queryClient.clear();
      navigate('/');
    },
    });
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      // 1. Update the context / localStorage
      loginContext(data.access_token, data.user);
      
      // 2. Clear any old cache from TanStack Query
      queryClient.clear();

      // 3. Redirect to dashboard
      navigate('/');
    },
    onError: (error: any) => {
      console.error('Login failed:', error.response?.data?.message || error.message);
    }
  });

  /**
   * Logout Function
   */
  const handleLogout = () => {
    logoutContext();
    queryClient.clear();
    navigate('/auth/login');
  };

  return {
    // State
    user,
    userRole: user?.role,
    isAuthenticated: !!user,
    isLoading,
    
    
    // Actions
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    
    logout: handleLogout,
    
    // Role Helpers
    isAdmin: user?.role === 'admin',
    isMember: user?.role === 'member',
      
    
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
  };
};