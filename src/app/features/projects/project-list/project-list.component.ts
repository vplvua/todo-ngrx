import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { Project } from '../project.model';
import * as ProjectActions from '../store/project.actions';
import * as ProjectSelectors from '../store/project.selector';

// Prime NG Components
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    // Prime NG imports
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    TooltipModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent implements OnInit {
  projects$: Observable<Project[]>;
  error$: Observable<string | null>;
  primeIcons = PrimeIcons;

  constructor(
    private store: Store,
    private router: Router,
    private confirmationService: ConfirmationService,
  ) {
    this.projects$ = this.store.select(ProjectSelectors.selectAllProjects);
    this.error$ = this.store.select(ProjectSelectors.selectProjectError);
  }

  ngOnInit(): void {
    // this.store.dispatch(ProjectActions.loadProjects());
  }

  navigateToDetail(id: string | null): void {
    if (id === null) {
      this.router.navigate(['/projects', 'new']);
    } else {
      this.store.dispatch(ProjectActions.selectProject({ id }));
      this.router.navigate(['/projects', id]);
    }
  }

  navigateToTodos(id: string): void {
    this.store.dispatch(ProjectActions.selectProject({ id }));
    this.router.navigate(['/projects', id, 'todos']);
  }

  confirmDelete(project: Project): void {
    this.confirmationService.confirm({
      header: 'Delete Confirmation',
      message: `Are you sure you want to delete <br><b>"${project.name}"</b>?`,
      icon: this.primeIcons.EXCLAMATION_TRIANGLE,
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.onDeleteProject(project.id);
      },
    });
  }

  onDeleteProject(id: string): void {
    this.store.dispatch(ProjectActions.deleteProject({ id }));
  }
}
