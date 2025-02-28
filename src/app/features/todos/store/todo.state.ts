import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Todo, TodoFilter } from '../todo.model';

export interface TodoState extends EntityState<Todo> {
  selectedTodoId: number | null;
  filter: TodoFilter;
  loading: boolean;
  error: string | null;
}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id,
  sortComparer: (a: Todo, b: Todo) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

export const initialTodoState: TodoState = todoAdapter.getInitialState({
  selectedTodoId: null,
  filter: TodoFilter.ALL,
  loading: false,
  error: null
});