// services/apiUpdate.ts

import apiClient from '../../../shared/services/apiClient';
import type {
  UpdateTaskPayload,
  UpdateTaskResponse,
} from '../types/update';

const TASKS_BASE_PATH = '/tasks';

export const taskUpdateApi = {
  /**
   * PUT /tasks/{id}
   * Update an existing task
   */
  updateTask: async (
    id: string,
    payload: UpdateTaskPayload
  ): Promise<UpdateTaskResponse> => {
    const response = await apiClient.put<UpdateTaskResponse>(
      `${TASKS_BASE_PATH}/${id}`,
      payload
    );
    return response.data;
  },
};
