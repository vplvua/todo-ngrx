import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LoadingState } from './loading.state';

export const selectLoadingState =
  createFeatureSelector<LoadingState>('loading');

export const selectIsLoading = createSelector(
  selectLoadingState,
  (state: LoadingState) => state.isLoading
);

export const selectPendingRequests = createSelector(
  selectLoadingState,
  (state: LoadingState) => state.pendingRequests
);
