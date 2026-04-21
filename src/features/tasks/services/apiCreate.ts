// services/apiCreate.ts

import apiClient from '../../../shared/services/apiClient';
import type {
  CreateTaskPayload,
  CreateTaskResponse,
} from '../types/create';

const TASKS_BASE_PATH = '/tasks';

export const taskCreateApi = {
  /**
   * POST /tasks
   * Create a new task (admin only)
   */
  createTask: async (
    payload: CreateTaskPayload
  ): Promise<CreateTaskResponse> => {
    const response = await apiClient.post<CreateTaskResponse>(
      TASKS_BASE_PATH,
      payload
    );
    return response.data;
  },
};
