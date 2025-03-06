import { createAction, props } from '@ngrx/store';
import { Project } from '../project.model';
import { Todo } from '../../todos/todo.model';

// Load Projects
export const loadProjects = createAction('[Project] Load Projects');

export const loadProjectsSuccess = createAction(
  '[Project] Load Projects Success',
  props<{ projects: Project[] }>(),
);

export const loadProjectsFailure = createAction(
  '[Project] Load Projects Failure',
  props<{ error: string }>(),
);

// Load Project Todos
export const loadProjectTodos = createAction(
  '[Project] Load Project Todos',
  props<{ projectId: string }>(),
);

export const loadProjectTodosSuccess = createAction(
  '[Project] Load Project Todos Success',
  props<{ todos: Todo[] }>(),
);

export const loadProjectTodosFailure = createAction(
  '[Project] Load Project Todos Failure',
  props<{ error: string }>(),
);

// Add Project
export const addProject = createAction(
  '[Project] Add Project',
  props<{ name: string; description: string }>(),
);

export const addProjectSuccess = createAction(
  '[Project] Add Project Success',
  props<{ project: Project }>(),
);

export const addProjectFailure = createAction(
  '[Project] Add Project Failure',
  props<{ error: string }>(),
);

// Update Project
export const updateProject = createAction(
  '[Project] Update Project',
  props<{ project: Project }>(),
);

export const updateProjectSuccess = createAction(
  '[Project] Update Project Success',
  props<{ project: Project }>(),
);

export const updateProjectFailure = createAction(
  '[Project] Update Project Failure',
  props<{ error: string }>(),
);

// Delete Project
export const deleteProject = createAction('[Project] Delete Project', props<{ id: string }>());

export const deleteProjectSuccess = createAction(
  '[Project] Delete Project Success',
  props<{ id: string }>(),
);

export const deleteProjectFailure = createAction(
  '[Project] Delete Project Failure',
  props<{ error: string }>(),
);

// Select Project
export const selectProject = createAction(
  '[Project] Select Project',
  props<{ id: string | null }>(),
);

// Add Todo to Project
export const addTodoToProject = createAction(
  '[Project] Add Todo to Project',
  props<{ projectId: string; title: string; description: string }>(),
);

export const addTodoToProjectSuccess = createAction(
  '[Project] Add Todo to Project Success',
  props<{ todo: Todo }>(),
);

export const addTodoToProjectFailure = createAction(
  '[Project] Add Todo to Project Failure',
  props<{ error: string }>(),
);
