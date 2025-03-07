import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import * as TodoActions from '../store/todo.actions';
import * as TodoSelectors from '../store/todo.selectors';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons } from 'primeng/api';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-todo-search',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, IconFieldModule, InputIconModule],
  templateUrl: './todo-search.component.html',
  styleUrl: './todo-search.component.scss',
})
export class TodoSearchComponent {
  searchControl = new FormControl();
  searchValue$: Observable<string | null>;
  primeIcons = PrimeIcons;

  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.searchValue$ = this.store.select(TodoSelectors.selectTodoSearchValue);
  }

  ngOnInit() {
    this.searchValue$.pipe(takeUntil(this.destroy$)).subscribe((searchValue) => {
      if (searchValue !== this.searchControl.value) {
        this.searchControl.setValue(searchValue, { emitEvent: false });
      }
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((searchValue) => {
        this.store.dispatch(TodoActions.setSearchValue({ searchValue: searchValue || null }));
      });
  }

  clearSearch(): void {
    this.searchControl.setValue(null);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
