import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProjectState, projectAdapter } from './project.state';

export const selectProjectState =
  createFeatureSelector<ProjectState>('projects');

export const {
  selectIds: selectProjectIds,
  selectEntities: selectProjectEntities,
  selectAll: selectAllProjects,
  selectTotal: selectTotalProjects,
} = projectAdapter.getSelectors(selectProjectState);

export const selectSelectedProjectId = createSelector(
  selectProjectState,
  (state: ProjectState) => state.selectedProjectId
);

export const selectSelectedProject = createSelector(
  selectProjectEntities,
  selectSelectedProjectId,
  (entities, selectedId) => (selectedId !== null ? entities[selectedId] : null)
);

export const selectProjectLoading = createSelector(
  selectProjectState,
  (state: ProjectState) => state.loading
);

export const selectProjectError = createSelector(
  selectProjectState,
  (state: ProjectState) => state.error
);
