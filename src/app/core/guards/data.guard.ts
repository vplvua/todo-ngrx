import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, switchMap, take, timeout } from 'rxjs';
import { Store } from '@ngrx/store';

import { DataService } from '../../shared/services/data.service';
import { selectAllTodos } from '../../features/todos/store/todo.selectors';
import { loadTodos } from '../../features/todos/store/todo.actions';
import { Todo } from '../../features/todos/todo.model';

export const dataAvailableGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const dataService = inject(DataService);
  const router = inject(Router);
  const path = route.routeConfig?.path;
  const store = inject(Store);

  store.dispatch(loadTodos());

  return store.select(selectAllTodos).pipe(
    take(1),
    switchMap((todos: Todo[]) => {
      if (todos.length > 0) {
        return of(true);
      }

      return dataService.hasDataForRoute(path).pipe(
        map((hasData) => {
          if (hasData) {
            return true;
          } else {
            return router.createUrlTree(['/home']);
          }
        }),
        catchError(() => of(router.createUrlTree(['/home']))),
      );
    }),
    // map((todos) => {
    //   if (todos.length > 0) {
    //     return true;
    //   } else {
    //     router.navigate(['/']);
    //     return false;
    //   }
    // }),
    // catchError(() => of(false)),
  );

  // return dataService.hasDataForRoute(path).pipe(
  //   map((hasData) => {
  //     if (hasData) {
  //       return true;
  //     } else {
  //       return router.createUrlTree(['/home']);
  //     }
  //   }),
  // );
};
