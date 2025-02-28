import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
  @Output() addTodo = new EventEmitter<string>();

  newTodoTitle = '';
  
  onSubmit(): void {
    const title = this.newTodoTitle.trim();
    if (title) {
      this.addTodo.emit(title);
      this.newTodoTitle = '';
    }
  }
}
