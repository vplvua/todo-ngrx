import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { todoReducer } from './features/todos/store/todo.reducer';
import { TodoEffects } from './features/todos/store/todo.effects';
import { projectReducer } from './features/projects/store/project.reducer';
import { ProjectEffects } from './features/projects/store/project.effects';
import { AppLayoutComponent } from './core/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { dataAvailableGuard } from './core/guards/data.guard';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    providers: [provideEffects(TodoEffects)],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'todos',
        // providers: [provideEffects(TodoEffects)],
        // canActivate: [dataAvailableGuard],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/todos/todo-list/todo-list.component').then(
                (c) => c.TodoListComponent,
              ),
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./features/todos/todo-detail/todo-detail.component').then(
                (c) => c.TodoDetailComponent,
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./features/todos/todo-detail/todo-detail.component').then(
                (c) => c.TodoDetailComponent,
              ),
          },
        ],
      },
      {
        path: 'projects',
        providers: [provideEffects(ProjectEffects)],
        canActivate: [dataAvailableGuard],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/projects/project-list/project-list.component').then(
                (c) => c.ProjectListComponent,
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./features/projects/project-detail/project-detail.component').then(
                (c) => c.ProjectDetailComponent,
              ),
          },
          {
            path: ':id/todos',
            loadComponent: () =>
              import('./features/projects/project-todos/project-todos.component').then(
                (c) => c.ProjectTodosComponent,
              ),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
