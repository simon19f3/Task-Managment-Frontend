import apiClient from '../../../shared/services/apiClient';
import type { User } from '../types';

// Types specific to API requests/responses
export interface RegisterCredentials {
  email: string;
  name: string;
  password: string;
}
export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  /**
   * Send login credentials to the server
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return data;
  },

  /**
   * Optional: Verify the current token and get user data
   * Useful if the user refreshes the page and we only have a token
   */
  getMe: async (): Promise<User> => {
    const { data } = await apiClient.get<User>('/auth/me');
    return data;
  },

  /**
   * Optional: Notify backend of logout
   */
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  register: async (credentials: RegisterCredentials): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>('/auth/register', credentials);
    return data;
  },
};