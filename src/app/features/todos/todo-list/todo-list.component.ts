import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { TodoFilterComponent } from '../todo-filter/todo-filter.component';
import { Todo, TodoFilter } from '../todo.model';
import * as TodoActions from '../store/todo.actions';
import * as TodoSelectors from '../store/todo.selectors';

// Prime NG Components
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    TodoFilterComponent,
    // Prime NG imports
    ButtonModule,
    TableModule,
    TagModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;
  filter$: Observable<TodoFilter>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  primeIcons = PrimeIcons;

  constructor(
    private store: Store,
    private router: Router,
    private confirmationService: ConfirmationService,
  ) {
    this.todos$ = this.store.select(TodoSelectors.selectFilteredTodos);
    this.filter$ = this.store.select(TodoSelectors.selectTodoFilter);
    this.loading$ = this.store.select(TodoSelectors.selectTodoLoading);
    this.error$ = this.store.select(TodoSelectors.selectTodoError);
  }

  ngOnInit(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  navigateToDetail(id: string | null): void {
    if (id === null) {
      this.router.navigate(['/todos', 'new']);
      return;
    } else {
      this.store.dispatch(TodoActions.setSelectedTodo({ id }));
      this.router.navigate(['/todos', id]);
    }
  }

  onToggleTodo(id: string): void {
    this.store.dispatch(TodoActions.toggleTodoCompleted({ id }));
  }

  confirmDelete(todo: Todo): void {
    this.confirmationService.confirm({
      header: 'Delete Confirmation',
      message: `Are you sure you want to delete <br><b>"${todo.title}"</b>?`,
      icon: this.primeIcons.EXCLAMATION_TRIANGLE,
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.onDeleteTodo(todo.id);
      },
    });
  }

  onDeleteTodo(id: string): void {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

  onFilterChange(filter: TodoFilter): void {
    this.store.dispatch(TodoActions.setTodoFilter({ filter }));
  }
}
