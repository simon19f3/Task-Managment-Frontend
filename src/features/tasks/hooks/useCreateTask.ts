import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskCreateApi } from '../services/apiCreate';
import type{ CreateTaskPayload } from '../types/create';
import { taskKeys } from '../constants/queryKeys';

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskPayload) =>
      taskCreateApi.createTask(payload),

    onSuccess: () => {
      // Refetch task list after creation
      queryClient.invalidateQueries({
        queryKey: taskKeys.lists(),
      });
    },
  });
};
