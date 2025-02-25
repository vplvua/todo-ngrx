import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoEffects } from './state/todo.effects';
import { todoReducer } from './state/todo.reducer';

export const todoRoutes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    providers: [
      provideState('todos', todoReducer),
      provideEffects(TodoEffects)
    ]
  }
];