import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskStatusUpdateApi } from '../services/apiUpdateStatus';
import { taskKeys } from '../constants/queryKeys';
import type { UpdateTaskStatusParams } from '../types/updateStatus';

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateTaskStatusParams) =>
      taskStatusUpdateApi.updateTaskStatus(params),

    onSuccess: (_, variables) => {
      // 1. Invalidate the specific task detail to trigger a re-fetch
      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(variables.id),
      });

      // 2. Refresh dashboard lists
      queryClient.invalidateQueries({
        queryKey: taskKeys.lists(),
      });
    },
  });
};