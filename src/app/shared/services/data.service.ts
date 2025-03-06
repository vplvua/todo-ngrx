import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, take, timeout } from 'rxjs';

import { selectAllTodos } from '../../features/todos/store/todo.selectors';
import { Todo } from '../../features/todos/todo.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private store: Store<any>,
    private router: Router,
  ) {}

  hasDataForRoute(path: string | undefined): Observable<boolean> {
    if (!path) return of(false);

    switch (path) {
      case 'todos':
        return this.store.select(selectAllTodos).pipe(
          timeout(3000),
          map((todos: Todo[]) => {
            return todos.length > 0;
            // if (todos.length > 0) {
            //   return true;
            // } else {
            //   this.router.navigate(['/']);
            //   return false;
            // }
          }),
          catchError(() => of(false)),
          take(1),
        );

      default:
        //   this.router.navigate(['/']);
        return of(false);
    }
  }
}
