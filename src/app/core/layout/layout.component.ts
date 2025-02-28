import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectIsLoading } from '../../store/loading/loading.selectors';

// PrimeNG imports
import { MenubarModule } from 'primeng/menubar';
import { PrimeIcons, MenuItem } from 'primeng/api';

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

  constructor(private store: Store) {
    this.initMenuItems();
  }

  private initMenuItems() {
    this.items = [
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
