import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TodoFilter } from '../todo.model';

// PrimeNG imports
import { SelectButtonModule } from 'primeng/selectbutton';

interface FilterOption {
  label: string;
  value: TodoFilter;
}

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [CommonModule, SelectButtonModule, FormsModule],
  templateUrl: './todo-filter.component.html',
  styleUrl: './todo-filter.component.scss'
})
export class TodoFilterComponent {
  @Input() currentFilter: TodoFilter = TodoFilter.ALL;
  @Output() filterChange = new EventEmitter<TodoFilter>();

  TodoFilter = TodoFilter;
  filterOptions: FilterOption[] = [];

  ngOnInit(): void {
    this.filterOptions = [
      { label: 'ALL', value: TodoFilter.ALL },
      { label: 'ACTIVE', value: TodoFilter.ACTIVE },
      { label: 'COMPLETED', value: TodoFilter.COMPLETED }
    ];
  }

  onFilterChange(event: any): void {
    this.filterChange.emit(event.value);
  }
}
