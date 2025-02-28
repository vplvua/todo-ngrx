export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  projectId?: number;
  createdAt: Date;
  updatedAt?: Date;
}

export enum TodoFilter {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}
