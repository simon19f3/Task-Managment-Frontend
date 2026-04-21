import type { TaskStatus, Task } from '../types/task';
import type { User } from "@/features/user/types/user";
export interface UpdateTaskStatusDto {
  status: TaskStatus;
}

export interface UpdateTaskStatusParams {
  id: string;
  payload: UpdateTaskStatusDto;
}
export interface UpdateTaskResponse extends Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;  // ISO datetime
  updatedAt: string;  // ISO datetime
  assigneeId: User[];
}
