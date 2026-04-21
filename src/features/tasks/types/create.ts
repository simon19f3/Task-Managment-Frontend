// types/create.ts

export type TaskStatus = 'todo' | 'in_progress' | 'done';

/**
 * Payload for creating a task
 */
export interface CreateTaskPayload {
  title: string;
  description: string;
  status: TaskStatus;
  assigneeIds: string[]; // UUID
  assigneeId: string; // Array of user IDs (UUIDs)
  dueDate: string;    // YYYY-MM-DD
}

/**
 * Response returned after creating a task
 */
export interface CreateTaskResponse {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
}
