import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProjectState } from './project.state';

export const selectProjectState = createFeatureSelector<ProjectState>('projects');

export const selectAllProjects = createSelector(
  selectProjectState,
  (state: ProjectState) => state.projects,
);

export const selectSelectedProjectId = createSelector(
  selectProjectState,
  (state: ProjectState) => state.selectedProjectId,
);

export const selectSelectedProject = createSelector(
  selectAllProjects,
  selectSelectedProjectId,
  (projects, selectedId) =>
    selectedId !== null ? projects.find((p) => p.id === selectedId) || null : null,
);

export const selectProjectError = createSelector(
  selectProjectState,
  (state: ProjectState) => state.error,
);
