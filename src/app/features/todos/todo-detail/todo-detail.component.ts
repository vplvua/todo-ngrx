import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Todo } from '../todo.model';
import * as TodoActions from '../store/todo.actions';
import * as TodoSelectors from '../store/todo.selectors';
import { selectAllProjects } from '../../projects/store/project.selector';

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
import { filter, Observable, of, Subject, switchMap, take, takeUntil, EMPTY, map, tap } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';

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
    ConfirmDialogModule,
    DropdownModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
})
export class TodoDetailComponent {
  todoForm: FormGroup;
  todoId: string | null = null;
  isNewTodo = true;
  selectedTodo: Todo | null = null;
  // todo$: Observable<Todo | null | undefined>;
  private destroy$ = new Subject<void>();
  primeIcons = PrimeIcons;
  projects$: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private confirmationService: ConfirmationService,
  ) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      completed: [false],
      projectId: [''],
    });

    this.projects$ = this.store.select(selectAllProjects).pipe(
      map((projects) => {
        return projects.map((project) => {
          return {
            label: project.name,
            value: project.id,
          };
        });
      }),
    );
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          const id = params.get('id');

          if (id === 'new') {
            this.isNewTodo = true;
            this.todoId = null;

            this.store.dispatch(TodoActions.setSelectedTodo({ id: null }));

            return of(null);
          } else if (id) {
            this.isNewTodo = false;
            this.todoId = id;

            this.store.dispatch(TodoActions.setSelectedTodo({ id: id }));

            return this.store
              .select(TodoSelectors.selectSelectedTodo)
              .pipe(filter((todo): todo is Todo => !!todo));
          }
          return EMPTY;
        }),
      )
      .subscribe((todo) => {
        if (todo) {
          this.selectedTodo = todo as Todo;

          this.todoForm.setValue({
            title: todo.title,
            description: todo.description || '',
            completed: todo.completed,
            projectId: todo.projectId || null,
          });
        }
      });
  }

  onSubmit(): void {
    if (this.todoForm.invalid) return;

    const formValues = this.todoForm.value;

    if (this.isNewTodo) {
      this.store.dispatch(TodoActions.addTodo({ title: formValues.title || '' }));
      this.navigateBack();
    } else if (this.todoId && this.selectedTodo) {
      const updatedTodo: Todo = {
        ...this.selectedTodo,
        title: formValues.title || '',
        description: formValues.description || '',
        completed: !!formValues.completed,
        projectId: formValues.projectId,
        updatedAt: new Date(),
      };

      this.store.dispatch(TodoActions.updateTodo({ todo: updatedTodo }));
      this.navigateBack();
    }
  }

  navigateBack(): void {
    this.store.dispatch(TodoActions.clearSelectedTodo());
    this.router.navigate(['/todos']);
  }

  confirmDelete(): void {
    if (this.isNewTodo || !this.todoId) {
      return;
    }

    this.confirmationService.confirm({
      header: 'Delete Confirmation',
      message: `Are you sure you want to delete this task?`,
      icon: this.primeIcons.EXCLAMATION_TRIANGLE,
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        if (this.todoId) {
          this.store.dispatch(TodoActions.deleteTodo({ id: this.todoId }));
          this.navigateBack();
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(TodoActions.clearSelectedTodo());
    this.destroy$.next();
    this.destroy$.complete();
  }
}
