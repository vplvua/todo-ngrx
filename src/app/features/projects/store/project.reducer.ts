import { createReducer, on } from '@ngrx/store';

import { initialProjectState } from './project.state';
import * as ProjectActions from './project.actions';

export const projectReducer = createReducer(
  initialProjectState,

  // Load Projects
  on(ProjectActions.loadProjects, (state) => ({
    ...state,
    error: null,
  })),

  on(ProjectActions.loadProjectsSuccess, (state, { projects }) => ({
    ...state,
    projects,
    error: null,
  })),

  on(ProjectActions.loadProjectsFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Add Project
  on(ProjectActions.addProject, (state) => ({
    ...state,
    error: null,
  })),

  on(ProjectActions.addProjectSuccess, (state, { project }) => ({
    ...state,
    projects: [project, ...state.projects],
    error: null,
  })),

  on(ProjectActions.addProjectFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Update Project
  on(ProjectActions.updateProject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProjectActions.updateProjectSuccess, (state, { project }) => ({
    ...state,
    projects: state.projects.map((p) => (p.id === project.id ? project : p)),
    error: null,
  })),

  on(ProjectActions.updateProjectFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Project
  on(ProjectActions.deleteProject, (state) => ({
    ...state,
    error: null,
  })),

  on(ProjectActions.deleteProjectSuccess, (state, { id }) => ({
    ...state,
    projects: state.projects.filter((p) => p.id !== id),
    selectedProjectId: state.selectedProjectId === id ? null : state.selectedProjectId,
    error: null,
  })),

  on(ProjectActions.deleteProjectFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Select Project
  on(ProjectActions.selectProject, (state, { id }) => ({
    ...state,
    selectedProjectId: id,
    error: null,
  })),

  // Clear Project Errors
  on(ProjectActions.clearProjectErrors, (state) => ({
    ...state,
    error: null,
  })),
);
