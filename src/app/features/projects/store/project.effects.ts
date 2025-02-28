import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { ProjectService } from '../services/project.service';
import * as ProjectActions from './project.actions';
import * as TodoActions from '../../todos/store/todo.actions';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {}

  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadProjects),
      mergeMap(() =>
        this.projectService.getProjects().pipe(
          map((projects) => ProjectActions.loadProjectsSuccess({ projects })),
          catchError((error) =>
            of(ProjectActions.loadProjectsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadProjectTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.loadProjectTodos),
      mergeMap(({ projectId }) =>
        this.projectService.getProjectTodos(projectId).pipe(
          map((todos) => ProjectActions.loadProjectTodosSuccess({ todos })),
          catchError((error) =>
            of(ProjectActions.loadProjectTodosFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.addProject),
      mergeMap(({ name, description }) =>
        this.projectService.addProject(name, description).pipe(
          map((project) => ProjectActions.addProjectSuccess({ project })),
          catchError((error) =>
            of(ProjectActions.addProjectFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.updateProject),
      mergeMap(({ project }) =>
        this.projectService.updateProject(project).pipe(
          map((updatedProject) =>
            ProjectActions.updateProjectSuccess({ project: updatedProject })
          ),
          catchError((error) =>
            of(ProjectActions.updateProjectFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.deleteProject),
      mergeMap(({ id }) =>
        this.projectService.deleteProject(id).pipe(
          map(() => ProjectActions.deleteProjectSuccess({ id })),
          catchError((error) =>
            of(ProjectActions.deleteProjectFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addTodoToProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.addTodoToProject),
      mergeMap(({ projectId, title, description }) =>
        this.projectService
          .addTodoToProject(projectId, title, description)
          .pipe(
            switchMap((todo) => [
              ProjectActions.addTodoToProjectSuccess({ todo }),
              TodoActions.addTodoSuccess({ todo }),
            ]),
            catchError((error) =>
              of(
                ProjectActions.addTodoToProjectFailure({ error: error.message })
              )
            )
          )
      )
    )
  );
}
