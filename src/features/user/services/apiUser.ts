// features/users/services/apiUser.ts

import  apiClient  from '@/shared/services/apiClient'; // adjust to your actual path
import type { User } from '../types/user';

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get('/users');
    return response.data;
  },
};
