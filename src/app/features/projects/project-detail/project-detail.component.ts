import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

import { Project } from '../project.model';
import * as ProjectActions from '../store/project.actions';
import * as ProjectSelectors from '../store/project.selector';

// PrimeNG Components
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // PrimeNG Modules
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  projectForm: FormGroup;
  selectedProject: Project | null = null;
  isNewProject = true;
  submitted = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && id !== 'new') {
      this.isNewProject = false;

      this.store.dispatch(ProjectActions.selectProject({ id }));

      this.store
        .select(ProjectSelectors.selectSelectedProject)
        .pipe(takeUntil(this.destroy$))
        .subscribe((project) => {
          if (project) {
            this.selectedProject = project;
            this.projectForm.patchValue({
              name: project.name,
              description: project.description,
            });
          }
        });
    }
  }

  get f() {
    return this.projectForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.projectForm.invalid) {
      return;
    }

    const { name, description } = this.projectForm.value;

    if (this.isNewProject) {
      this.store.dispatch(
        ProjectActions.addProject({
          name,
          description,
        }),
      );
    } else if (this.selectedProject) {
      const updatedProject: Project = {
        ...this.selectedProject,
        name,
        description,
        updatedAt: new Date(),
      };

      this.store.dispatch(
        ProjectActions.updateProject({
          project: updatedProject,
        }),
      );
    }

    this.router.navigate(['/projects']);
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
