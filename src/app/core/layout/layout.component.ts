import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectIsLoading } from '../../store/loading/loading.selectors';

// PrimeNG imports
import { MenubarModule } from 'primeng/menubar';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { selectAllTodos } from '../../features/todos/store/todo.selectors';

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
  isTasksDisabled = false;

  constructor(private store: Store) {
    this.initMenuItems();
    this.store.select(selectAllTodos).subscribe((todos) => {
      this.isTasksDisabled = todos.length === 0;
    });
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
        disabled: this.isTasksDisabled,
      },
      {
        label: 'Projects',
        icon: PrimeIcons.BRIEFCASE,
        routerLink: '/projects',
      },
    ];
  }
}
