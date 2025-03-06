export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  projectId?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export enum TodoFilter {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}
