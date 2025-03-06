import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RootState } from '../../store/root.state';
import { selectAllTodos } from '../../features/todos/store/todo.selectors';

@Injectable({
  providedIn: 'root',
})
export class TodosGuard implements CanActivate {
  constructor(
    private store: Store<RootState>,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectAllTodos).pipe(
      map((todos) => {
        if (todos.length > 0) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      }),
    );
  }
}
