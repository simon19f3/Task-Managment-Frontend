import { useQuery } from '@tanstack/react-query';
import { taskGetByIdApi } from '../services/apiGetById';
import { taskKeys } from '../constants/queryKeys';

export const useTaskById = (id?: string) => {
  return useQuery({
    queryKey: id ? taskKeys.detail(id) : [],
    queryFn: () => taskGetByIdApi.getTaskById(id!),
    enabled: !!id,
  });
};
