import { createReducer, on } from '@ngrx/store';

import { initialLoadingState } from './loading.state';
import * as LoadingActions from './loading.actions';

export const loadingReducer = createReducer(
  initialLoadingState,

  on(LoadingActions.startLoading, (state) => ({
    ...state,
    isLoading: true,
    pendingRequests: state.pendingRequests + 1,
  })),

  on(LoadingActions.stopLoading, (state) => {
    const pendingRequests = state.pendingRequests - 1;
    return {
      ...state,
      isLoading: pendingRequests > 0,
      pendingRequests: pendingRequests < 0 ? 0 : pendingRequests,
    };
  })
);
