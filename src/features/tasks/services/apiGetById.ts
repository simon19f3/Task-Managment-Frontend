// services/apiGetById.ts

import apiClient from '../../../shared/services/apiClient';
import type { GetTaskByIdResponse } from '../types/getById';

const TASKS_BASE_PATH = '/tasks';

export const taskGetByIdApi = {
  /**
   * GET /tasks/{id}
   * Fetch task by UUID
   */
  getTaskById: async (id: string): Promise<GetTaskByIdResponse> => {
    const response = await apiClient.get<GetTaskByIdResponse>(
      `${TASKS_BASE_PATH}/${id}`
    );
    return response.data;
  },
};
