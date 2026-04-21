// services/apiDelete.ts

import apiClient from '../../../shared/services/apiClient';
import type { DeleteTaskResponse } from '../types/delete';

const TASKS_BASE_PATH = '/tasks';

export const taskDeleteApi = {
  /**
   * DELETE /tasks/{id}
   * Delete a task (admin only)
   */
  deleteTask: async (id: string): Promise<DeleteTaskResponse> => {
    const response = await apiClient.delete<DeleteTaskResponse>(
      `${TASKS_BASE_PATH}/${id}`
    );
    return response.data;
  },
};
