import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map, of, switchMap, tap } from 'rxjs';

import { LoadingActions } from './loading.actions';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoadingEffects {
  private readonly DELAY_TIME = environment.LOADING_DELAY;

  setLoadingOnIncrement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadingActions.incrementPendingRequests),
      switchMap(() =>
        of(true).pipe(
          delay(this.DELAY_TIME),
          map(() => LoadingActions.setLoadingState()),
        ),
      ),
    ),
  );

  updateLoadingOnDecrement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadingActions.decrementPendingRequests),
      map(() => LoadingActions.setLoadingState()),
    ),
  );

  constructor(private actions$: Actions) {}
}
