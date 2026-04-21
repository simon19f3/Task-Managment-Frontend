// features/users/hooks/useUsers.ts

import { useQuery } from '@tanstack/react-query';
import { userApi } from '../services/apiUser';
import { userKeys } from '../constants/userKeys';

export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: userApi.getUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
