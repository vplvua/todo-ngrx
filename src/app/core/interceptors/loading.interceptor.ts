import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize, Observable } from 'rxjs';

import { LoadingActions } from '../../store/loading/loading.actions';

export function loadingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const store = inject(Store);

  const ignoreLoading = req.headers.has('X-Skip-Loader');
  if (!ignoreLoading) {
    store.dispatch(LoadingActions.incrementPendingRequests());
  }

  return next(req).pipe(
    finalize(() => {
      if (!ignoreLoading) {
        store.dispatch(LoadingActions.decrementPendingRequests());
      }
    }),
  );
}
