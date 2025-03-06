import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

import { Todo } from '../todo.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl + '/todos');
  }

  addTodo(title: string, projectId?: string | null): Observable<Todo> {
    const todo: Partial<Todo> = {
      title,
      completed: false,
      createdAt: new Date(),
    };

    if (projectId) {
      todo.projectId = projectId;
    }

    return this.http.post<Todo>(this.apiUrl + '/todos', todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const updatedTodo = {
      ...todo,
      updatedAt: new Date(),
    };

    return this.http.put<Todo>(`${this.apiUrl}/todos/${todo.id}`, updatedTodo);
  }

  toggleTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/todos/${id}`).pipe(
      switchMap((todo) => {
        const updatedTodo = {
          ...todo,
          completed: !todo.completed,
          updatedAt: new Date(),
        };

        return this.http.put<Todo>(`${this.apiUrl}/todos/${id}`, updatedTodo);
      }),
    );
  }

  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/todos/${id}`);
  }
}
