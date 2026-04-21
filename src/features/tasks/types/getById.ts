// types/getById.ts
import type { User } from "@/features/user/types/user";
import type { Task } from "./task";
import type { TaskStatus } from "./task";

export interface GetTaskByIdResponse extends Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;        // ISO date (YYYY-MM-DD)
  createdAt: string;     // ISO datetime
  updatedAt: string;     // ISO datetime
  assignees: User[];
}
