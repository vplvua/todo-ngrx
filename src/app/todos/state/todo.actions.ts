import { createAction, props } from '@ngrx/store';

import { Todo, TodoFilter } from '../todo.model';

// Load Todos
export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: string }>()
);

// Add Todo
export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ title: string }>()
);
export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{ todo: Todo }>()
);
export const addTodoFailure = createAction(
  '[Todo] Add Todo Failure',
  props<{ error: string }>()
);

// Update Todo
export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ todo: Todo }>()
);
export const updateTodoSuccess = createAction(
  '[Todo] Update Todo Success',
  props<{ todo: Todo }>()
);
export const updateTodoFailure = createAction(
  '[Todo] Update Todo Failure',
  props<{ error: string }>()
);

// Toggle Todo
export const toggleTodoCompleted = createAction(
  '[Todo] Toggle Todo Completed',
  props<{ id: number }>()
);

// Delete Todo
export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: number }>()
);
export const deleteTodoSuccess = createAction(
  '[Todo] Delete Todo Success',
  props<{ id: number }>()
);
export const deleteTodoFailure = createAction(
  '[Todo] Delete Todo Failure',
  props<{ error: string }>()
);

// Set Selected Todo
export const setSelectedTodo = createAction(
  '[Todo] Set Selected Todo',
  props<{ id: number | null }>()
);

// Filter Todos
export const setTodoFilter = createAction(
  '[Todo] Set Todo Filter',
  props<{ filter: TodoFilter }>()
);