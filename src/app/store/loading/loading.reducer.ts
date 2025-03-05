import { createReducer, on } from '@ngrx/store';

import { initialLoadingState } from './loading.state';
import { LoadingActions } from './loading.actions';

export const loadingReducer = createReducer(
  initialLoadingState,

  on(LoadingActions.incrementPendingRequests, (state) => ({
    ...state,
    pendingRequests: state.pendingRequests + 1,
  })),

  on(LoadingActions.decrementPendingRequests, (state) => {
    const pendingRequests = Math.max(0, state.pendingRequests - 1);
    return {
      ...state,
      pendingRequests: pendingRequests,
    };
  }),

  on(LoadingActions.setLoadingState, (state) => ({
    ...state,
    isLoading: state.pendingRequests > 0,
  })),
);
