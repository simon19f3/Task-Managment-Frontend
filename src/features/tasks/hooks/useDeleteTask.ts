import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskDeleteApi } from '../services/apiDelete';
import { taskKeys } from '../constants/queryKeys';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      taskDeleteApi.deleteTask(id),

    onSuccess: (_, id) => {
      // Remove from detail cache
      queryClient.removeQueries({
        queryKey: taskKeys.detail(id),
      });

      // Refresh task lists
      queryClient.invalidateQueries({
        queryKey: taskKeys.lists(),
      });
    },
  });
};
