import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectIsLoading } from '../../store/loading/loading.selectors';

// PrimeNG imports
import { MenubarModule } from 'primeng/menubar';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { selectHasTodos } from '../../features/todos/store/todo.selectors';
import { loadTodos } from '../../features/todos/store/todo.actions';
import { loadProjects } from '../../features/projects/store/project.actions';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class AppLayoutComponent {
  isLoading$ = this.store.select(selectIsLoading);
  items: MenuItem[] = [];
  isTasksDisabled$ = this.store.select((state) => !selectHasTodos(state));

  constructor(private store: Store) {
    this.store.dispatch(loadTodos());
    this.store.dispatch(loadProjects());

    this.initMenuItems();
    this.isTasksDisabled$.subscribe((isDisabled) => {
      this.updateTasksMenuItem(isDisabled);
    });
  }

  private updateTasksMenuItem(isProjectsDisabled: boolean) {
    const tasksMenuItem = this.items.find((item) => item.routerLink === '/projects');
    if (tasksMenuItem) {
      tasksMenuItem.disabled = isProjectsDisabled;
    }
    this.items = [...this.items];
  }

  private initMenuItems() {
    this.items = [
      {
        label: 'Home',
        icon: PrimeIcons.HOME,
        routerLink: '/home',
      },
      {
        label: 'Tasks',
        icon: PrimeIcons.CHECK_SQUARE,
        routerLink: '/todos',
      },
      {
        label: 'Projects',
        icon: PrimeIcons.BRIEFCASE,
        routerLink: '/projects',
      },
    ];
  }
}
