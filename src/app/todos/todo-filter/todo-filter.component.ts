import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TodoFilter } from '../todo.model';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-filter.component.html',
  styleUrl: './todo-filter.component.scss'
})
export class TodoFilterComponent {
  @Input() currentFilter: TodoFilter = TodoFilter.ALL;
  @Output() filterChange = new EventEmitter<TodoFilter>();

  TodoFilter = TodoFilter;

  setFilter(filter: TodoFilter): void {
    this.filterChange.emit(filter);
  }
}
