import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Todo } from '../todo.model';
import * as TodoActions from '../store/todo.actions';
import * as TodoSelectors from '../store/todo.selectors';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, Observable, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    // PrimeNG imports
    ButtonModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    MessageModule,
    ConfirmDialogModule
  ],  
  providers: [ConfirmationService],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
})
export class TodoDetailComponent {
  todoForm: FormGroup;
  todoId: string | null = null;
  isNewTodo = false;
  todo$: Observable<Todo | null | undefined>;
  private destroy$ = new Subject<void>();
  primeIcons = PrimeIcons;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private confirmationService: ConfirmationService
  ) {
    this.todo$ = this.store.select(TodoSelectors.selectSelectedTodo);

    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      completed: [false]
    });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(params => {
        const id = params.get('id');

        console.log('id', id);
        
        if (id === 'new') {
          this.isNewTodo = true;
          this.todoId = null;

          this.store.dispatch(TodoActions.setSelectedTodo({ id: null }));
        } else if (id) {
          this.isNewTodo = false;

          this.store.dispatch(TodoActions.setSelectedTodo({ id: id }));
          
          this.todo$.pipe(
            filter(todo => !!todo),
            take(1),
            takeUntil(this.destroy$)
          ).subscribe((todo: Todo | null | undefined) => {
            if (todo) {
              this.todoForm.patchValue({
                title: todo.title,
                description: todo.description,
                completed: todo.completed
              });
            }
          });
        }
      });
  }

  onSubmit(): void {
    if (this.todoForm.invalid) return;
    
    const formValues = this.todoForm.value;
    
    if (this.isNewTodo) {
      this.store.dispatch(TodoActions.addTodo({ title: formValues.title }));
      this.navigateBack();
    } else if (this.todoId) {
      this.todo$.pipe(
        filter(todo => !!todo),
        take(1)
      ).subscribe((existingTodo: Todo | null | undefined) => {
        if (existingTodo) {
          const updatedTodo: Todo = {
            ...existingTodo,
            title: formValues.title,
            description: formValues.description,
            completed: formValues.completed,
            updatedAt: new Date()
          };
          
          this.store.dispatch(TodoActions.updateTodo({ todo: updatedTodo }));
          this.navigateBack();
        }
      });
    }
  }

  navigateBack(): void {
    this.router.navigate(['/todos']);
  }

  confirmDelete(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this task?',
      accept: () => {
        if (this.todoId) {
          this.store.dispatch(TodoActions.deleteTodo({ id: this.todoId }));
          this.navigateBack();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
