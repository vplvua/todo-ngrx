import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { TodoService } from '../services/todo.service';
import * as TodoActions from './todo.actions';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}

  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType(TodoActions.loadTodos),
    mergeMap(() => this.todoService.getTodos().pipe(
      map(todos => TodoActions.loadTodosSuccess({ todos })),
      catchError(error => of(TodoActions.loadTodosFailure({ error: error.message })))
    ))
  ));

  addTodo$ = createEffect(() => this.actions$.pipe(
    ofType(TodoActions.addTodo),
    mergeMap(({ title }) => this.todoService.addTodo(title).pipe(
      map(todo => TodoActions.addTodoSuccess({ todo })),
      catchError(error => of(TodoActions.addTodoFailure({ error: error.message })))
    ))
  ));

  updateTodo$ = createEffect(() => this.actions$.pipe(
    ofType(TodoActions.updateTodo),
    mergeMap(({ todo }) => this.todoService.updateTodo(todo).pipe(
      map(updatedTodo => TodoActions.updateTodoSuccess({ todo: updatedTodo })),
      catchError(error => of(TodoActions.updateTodoFailure({ error: error.message })))
    ))
  ));

  deleteTodo$ = createEffect(() => this.actions$.pipe(
    ofType(TodoActions.deleteTodo),
    mergeMap(({ id }) => this.todoService.deleteTodo(id).pipe(
      map(() => TodoActions.deleteTodoSuccess({ id })),
      catchError(error => of(TodoActions.deleteTodoFailure({ error: error.message })))
    ))
  ));
  
  toggleTodo$ = createEffect(() => this.actions$.pipe(
    ofType(TodoActions.toggleTodoCompleted),
    mergeMap(({ id }) => this.todoService.toggleTodo(id).pipe(
      map(todo => TodoActions.updateTodoSuccess({ todo })),
      catchError(error => of(TodoActions.updateTodoFailure({ error: error.message })))
    ))
  ));
}