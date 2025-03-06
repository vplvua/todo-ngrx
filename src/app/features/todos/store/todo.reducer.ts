import { createReducer, on } from '@ngrx/store';

import { initialTodoState, todoAdapter } from './todo.state';
import * as TodoActions from './todo.actions';

export const todoReducer = createReducer(
  initialTodoState,

  // Load Todos
  on(TodoActions.loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) =>
    todoAdapter.setAll(todos, {
      ...state,
      loading: false,
    }),
  ),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Todo
  on(TodoActions.addTodo, (state) => ({
    ...state,
    loading: true,
  })),
  on(TodoActions.addTodoSuccess, (state, { todo }) =>
    todoAdapter.addOne(todo, {
      ...state,
      loading: false,
    }),
  ),
  on(TodoActions.addTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Todo
  on(TodoActions.updateTodo, (state) => ({
    ...state,
    loading: true,
  })),
  on(TodoActions.updateTodoSuccess, (state, { todo }) =>
    todoAdapter.updateOne(
      { id: todo.id, changes: todo },
      {
        ...state,
        loading: false,
      },
    ),
  ),
  on(TodoActions.updateTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Toggle Todo Completed
  on(TodoActions.toggleTodoCompleted, (state, { id }) => {
    const todo = state.entities[id];
    if (!todo) return state;

    return todoAdapter.updateOne(
      {
        id,
        changes: {
          completed: !todo.completed,
          updatedAt: new Date(),
        },
      },
      state,
    );
  }),

  // Delete Todo
  on(TodoActions.deleteTodo, (state) => ({
    ...state,
    loading: true,
  })),
  on(TodoActions.deleteTodoSuccess, (state, { id }) =>
    todoAdapter.removeOne(id, {
      ...state,
      loading: false,
    }),
  ),
  on(TodoActions.deleteTodoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Set Selected Todo
  on(TodoActions.setSelectedTodo, (state, { id }) => ({
    ...state,
    selectedTodoId: id,
  })),
  on(TodoActions.clearSelectedTodo, (state) => ({
    ...state,
    selectedTodoId: null,
  })),

  // Set Filter
  on(TodoActions.setTodoFilter, (state, { filter }) => ({
    ...state,
    filter,
  })),

  // Clear Errors
  on(TodoActions.clearTodoError, (state) => ({
    ...state,
    error: null,
  })),
);
