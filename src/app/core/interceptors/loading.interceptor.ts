import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs';

import * as LoadingActions from '../../store/loading/loading.actions';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  store.dispatch(LoadingActions.startLoading());

  return next(req).pipe(
    finalize(() => {
      store.dispatch(LoadingActions.stopLoading());
    })
  );
};
