import { useQuery } from '@tanstack/react-query';
import { taskApi } from '../services/apiTask';
import type { TaskQueryParams } from '../types/task';
import { taskKeys } from '../constants/queryKeys';
import { keepPreviousData } from '@tanstack/react-query';

export const useTask = (filters?: TaskQueryParams) => {
  return useQuery({
    queryKey: taskKeys.list(filters),
    queryFn: () => taskApi.getTasks(filters),
    placeholderData: keepPreviousData,
  });
};
