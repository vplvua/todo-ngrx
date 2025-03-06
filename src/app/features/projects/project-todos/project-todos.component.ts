import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, takeUntil } from 'rxjs';

import { Project } from '../project.model';
import { Todo } from '../../todos/todo.model';
import * as ProjectActions from '../store/project.actions';
import * as ProjectSelectors from '../store/project.selector';
import * as TodoActions from '../../todos/store/todo.actions';
import * as TodoSelectors from '../../todos/store/todo.selectors';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-project-todos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // PrimeNG Modules
    ButtonModule,
    TableModule,
    TagModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './project-todos.component.html',
  styleUrl: './project-todos.component.scss',
})
export class ProjectTodosComponent implements OnInit, OnDestroy {
  project$: Observable<Project | null>;
  todos$: Observable<Todo[]>;
  error$: Observable<string | null>;
  primeIcons = PrimeIcons;

  projectId: string = '';
  displayAddTaskDialog = false;
  taskForm: FormGroup;
  submitted = false;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
  ) {
    this.project$ = this.store.select(ProjectSelectors.selectSelectedProject);
    this.todos$ = this.store
      .select(TodoSelectors.selectAllTodos)
      .pipe(map((todos) => todos.filter((todo) => todo.projectId === this.projectId)));
    this.error$ = this.store.select(ProjectSelectors.selectProjectError);

    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.projectId = id;
      this.store.dispatch(ProjectActions.selectProject({ id }));
      this.store.dispatch(ProjectActions.loadProjectTodos({ projectId: this.projectId }));
    }
  }

  get f() {
    return this.taskForm.controls;
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }

  openAddTaskDialog(): void {
    this.displayAddTaskDialog = true;
    this.submitted = false;
    this.taskForm.reset();
  }

  hideAddTaskDialog(): void {
    this.displayAddTaskDialog = false;
  }

  addTodoToProject(): void {
    this.submitted = true;

    if (this.taskForm.invalid || this.projectId === null) {
      return;
    }

    const { title, description } = this.taskForm.value;

    this.store.dispatch(
      ProjectActions.addTodoToProject({
        projectId: this.projectId,
        title,
        description,
      }),
    );

    this.hideAddTaskDialog();
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
        this.store.dispatch(TodoActions.deleteTodo({ id: todo.id }));
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
