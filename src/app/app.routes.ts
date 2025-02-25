import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./todos/todo.routes').then(m => m.todoRoutes)
    },
    { path: '**', redirectTo: '' }
];
