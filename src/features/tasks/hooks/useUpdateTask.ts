import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskUpdateApi } from '../services/apiUpdate';
import type { UpdateTaskPayload } from '../types/update';
import { taskKeys } from '../constants/queryKeys';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) => 
      taskUpdateApi.updateTask(id, payload),

    onSuccess: (data) => {
      // 1. Invalidate the specific task detail so it re-fetches
      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(data.id),
      });

      // 2. Refresh the dashboard lists
      queryClient.invalidateQueries({
        queryKey: taskKeys.lists(),
      });
    },
  });
};