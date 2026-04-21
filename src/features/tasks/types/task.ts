// types/task.ts

import type { User } from "@/features/auth/types";

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;        // ISO date (YYYY-MM-DD)
  createdAt: string;     // ISO datetime
  updatedAt: string;     // ISO datetime
  assignees: User[];
}

export interface TaskQueryParams {
  status?: TaskStatus;
  search?: string;
}
