// features/users/types/user.ts

export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
