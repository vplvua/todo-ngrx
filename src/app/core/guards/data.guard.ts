import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, skip, switchMap, take, timeout } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectAllTodos } from '../../features/todos/store/todo.selectors';
import { Todo } from '../../features/todos/todo.model';

export const dataAvailableGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectAllTodos).pipe(
    take(1),
    switchMap((todos: Todo[]) => {
      if (todos.length > 0) {
        return of(true);
      }

      return of(router.createUrlTree(['/home']));
    }),
  );
};
