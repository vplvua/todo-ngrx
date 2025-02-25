import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TodoState, todoAdapter } from './todo.state';
import { TodoFilter } from '../todo.model';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = todoAdapter.getSelectors(selectTodoState);

export const selectAllTodos = selectAll;

export const selectTodoEntities = selectEntities;

export const selectSelectedTodoId = createSelector(
  selectTodoState,
  (state: TodoState) => state.selectedTodoId
);

export const selectSelectedTodo = createSelector(
  selectTodoEntities,
  selectSelectedTodoId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

export const selectTodoFilter = createSelector(
  selectTodoState,
  (state: TodoState) => state.filter
);

export const selectFilteredTodos = createSelector(
  selectAllTodos,
  selectTodoFilter,
  (todos, filter) => {
    switch (filter) {
      case TodoFilter.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case TodoFilter.COMPLETED:
        return todos.filter(todo => todo.completed);
      case TodoFilter.ALL:
      default:
        return todos;
    }
  }
);

export const selectTodoLoading = createSelector(
  selectTodoState,
  (state: TodoState) => state.loading
);

export const selectTodoError = createSelector(
  selectTodoState,
  (state: TodoState) => state.error
);