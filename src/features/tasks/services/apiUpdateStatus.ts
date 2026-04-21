import apiClient from '@/shared/services/apiClient';
import type {
  UpdateTaskStatusParams,
  UpdateTaskResponse
} from '../types/updateStatus';

export const taskStatusUpdateApi = {
  // existing methods...

  updateTaskStatus: async ({
    id,
    payload,
  }: UpdateTaskStatusParams): Promise<UpdateTaskResponse> => {
    const response = await apiClient.patch(
      `/tasks/${id}/status`,
      payload
    );

    return response.data;
  },
};
