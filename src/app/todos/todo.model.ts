export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
    updatedAt?: Date;
  }
  
  export enum TodoFilter {
    ALL = 'ALL',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED'
  }