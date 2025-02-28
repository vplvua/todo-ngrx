import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { todoReducer } from './features/todos/store/todo.reducer';
import { TodoEffects } from './features/todos/store/todo.effects';
import { projectReducer } from './features/projects/store/project.reducer';
import { ProjectEffects } from './features/projects/store/project.effects';
import { AppLayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full',
      },
      {
        path: 'todos',
        providers: [
          provideState('todos', todoReducer),
          provideEffects(TodoEffects),
        ],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/todos/todo-list/todo-list.component').then(
                (c) => c.TodoListComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./features/todos/todo-detail/todo-detail.component').then(
                (c) => c.TodoDetailComponent
              ),
          },
        ],
      },
      {
        path: 'projects',
        providers: [
          provideState('projects', projectReducer),
          provideEffects(ProjectEffects),
        ],
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './features/projects/project-list/project-list.component'
              ).then((c) => c.ProjectListComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './features/projects/project-detail/project-detail.component'
              ).then((c) => c.ProjectDetailComponent),
          },
          {
            path: ':id/todos',
            loadComponent: () =>
              import(
                './features/projects/project-todos/project-todos.component'
              ).then((c) => c.ProjectTodosComponent),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'todos',
  },
];
