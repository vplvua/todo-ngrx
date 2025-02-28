import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoFilterComponent } from '../todo-filter/todo-filter.component';
import { Todo, TodoFilter } from '../todo.model';
import * as TodoActions from '../store/todo.actions';
import * as TodoSelectors from '../store/todo.selectors';

// Prime NG Components
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    TodoItemComponent,
    TodoFilterComponent,
    TodoFormComponent,
    // Prime NG imports
    ButtonModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  todos$: Observable<Todo[]>;
  filter$: Observable<TodoFilter>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(TodoSelectors.selectFilteredTodos);
    this.filter$ = this.store.select(TodoSelectors.selectTodoFilter);
    this.loading$ = this.store.select(TodoSelectors.selectTodoLoading);
    this.error$ = this.store.select(TodoSelectors.selectTodoError);
  }

  ngOnInit(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  onAddTodo(title: string): void {
    if (title.trim()) {
      this.store.dispatch(TodoActions.addTodo({ title }));
    }
  }

  onToggleTodo(id: number): void {
    this.store.dispatch(TodoActions.toggleTodoCompleted({ id }));
  }

  onDeleteTodo(id: number): void {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

  onEditTodo(todo: Todo): void {
    this.store.dispatch(TodoActions.updateTodo({ todo }));
  }

  onFilterChange(filter: TodoFilter): void {
    this.store.dispatch(TodoActions.setTodoFilter({ filter }));
  }
}
