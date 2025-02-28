import { createReducer, on } from '@ngrx/store';

import { initialProjectState, projectAdapter } from './project.state';
import * as ProjectActions from './project.actions';

export const projectReducer = createReducer(
  initialProjectState,

  // Load Projects
  on(ProjectActions.loadProjects, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProjectActions.loadProjectsSuccess, (state, { projects }) =>
    projectAdapter.setAll(projects, {
      ...state,
      loading: false,
    })
  ),

  on(ProjectActions.loadProjectsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Project
  on(ProjectActions.addProject, (state) => ({
    ...state,
    loading: true,
  })),

  on(ProjectActions.addProjectSuccess, (state, { project }) =>
    projectAdapter.addOne(project, {
      ...state,
      loading: false,
    })
  ),

  on(ProjectActions.addProjectFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Project
  on(ProjectActions.updateProject, (state) => ({
    ...state,
    loading: true,
  })),

  on(ProjectActions.updateProjectSuccess, (state, { project }) =>
    projectAdapter.updateOne(
      { id: project.id, changes: project },
      {
        ...state,
        loading: false,
      }
    )
  ),

  on(ProjectActions.updateProjectFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Project
  on(ProjectActions.deleteProject, (state) => ({
    ...state,
    loading: true,
  })),

  on(ProjectActions.deleteProjectSuccess, (state, { id }) =>
    projectAdapter.removeOne(id, {
      ...state,
      loading: false,
      selectedProjectId:
        state.selectedProjectId === id ? null : state.selectedProjectId,
    })
  ),

  on(ProjectActions.deleteProjectFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Select Project
  on(ProjectActions.selectProject, (state, { id }) => ({
    ...state,
    selectedProjectId: id,
  }))
);
