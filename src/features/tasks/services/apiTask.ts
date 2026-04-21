// services/api.ts

import apiClient from '../../../shared/services/apiClient';
import type { Task, TaskQueryParams } from '../types/task';
const TASKS_BASE_PATH = '/tasks';

export const taskApi = {
  /**
   * GET /tasks
   * List tasks with optional filters
   */
  getTasks: async (params?: TaskQueryParams): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>(TASKS_BASE_PATH, {
      params,
    });
    return response.data;
  },
};
