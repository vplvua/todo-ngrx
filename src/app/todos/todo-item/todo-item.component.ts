import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggleCompleted = new EventEmitter<number>();
  @Output() deleteTodo = new EventEmitter<number>();
  @Output() editTodo = new EventEmitter<Todo>();

  isEditing = false;
  editedTitle = '';

  startEdit(): void {
    this.isEditing = true;
    this.editedTitle = this.todo.title;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  saveEdit(): void {
    if (this.editedTitle.trim()) {
      this.editTodo.emit({
        ...this.todo,
        title: this.editedTitle.trim()
      });
      this.isEditing = false;
    }
  }

  onToggleCompleted(): void {
    this.toggleCompleted.emit(this.todo.id);
  }

  onDeleteTodo(): void {
    this.deleteTodo.emit(this.todo.id);
  }
}
