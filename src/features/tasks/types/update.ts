// types/update.ts

import type { User } from "@/features/user/types/user";

import type { TaskStatus } from "./task";
import type { Task } from "./task";

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: TaskStatus;
  assigneeIds?: string[]; // UUID
  dueDate?: string;    // YYYY-MM-DD
}


export interface UpdateTaskResponse extends Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;  // ISO datetime
  updatedAt: string;  // ISO datetime
  assignees: User[];
}
