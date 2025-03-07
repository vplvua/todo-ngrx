import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TodoState, todoAdapter } from './todo.state';
import { TodoFilter } from '../todo.model';
import * as ProjectSelectors from '../../projects/store/project.selector';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const { selectIds, selectEntities, selectAll, selectTotal } =
  todoAdapter.getSelectors(selectTodoState);

export const selectAllTodos = selectAll;

export const selectTodoEntities = selectEntities;

export const selectSelectedTodoId = createSelector(
  selectTodoState,
  (state: TodoState) => state.selectedTodoId,
);

export const selectSelectedTodo = createSelector(
  selectTodoEntities,
  selectSelectedTodoId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null),
);

export const selectTodoFilter = createSelector(selectTodoState, (state: TodoState) => state.filter);

export const selectFilteredByStatusTodos = createSelector(
  selectAllTodos,
  selectTodoFilter,
  (todos, filter) => {
    switch (filter) {
      case TodoFilter.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case TodoFilter.COMPLETED:
        return todos.filter((todo) => todo.completed);
      case TodoFilter.ALL:
      default:
        return todos;
    }
  },
);

export const selectTodoSearchValue = createSelector(
  selectTodoState,
  (state: TodoState) => state.searchValue,
);

export const selectFilteredTodos = createSelector(
  selectFilteredByStatusTodos,
  selectTodoSearchValue,
  (todos, searchValue) => {
    if (!searchValue || searchValue.trim() === '') {
      return todos;
    }

    const normalizedSearchValue = searchValue.toLowerCase().trim();
    return todos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(normalizedSearchValue) ||
        (todo.description && todo.description.toLowerCase().includes(normalizedSearchValue)),
    );
  },
);

export const selectTodoError = createSelector(selectTodoState, (state: TodoState) => state.error);

export const selectTodosWithProjects = createSelector(
  selectFilteredTodos,
  ProjectSelectors.selectAllProjects,
  (todos, projects) => {
    return todos.map((todo) => {
      const project = projects.find((p) => p.id === todo.projectId);
      return { ...todo, projectName: project?.name };
    });
  },
);
