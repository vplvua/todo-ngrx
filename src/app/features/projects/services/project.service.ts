import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../project.model';
import { Todo } from '../../todos/todo.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  getProjects(): Observable<Project[]> {
    return new Observable<Project[]>();
  }

  getProjectTodos(projectId: number): Observable<Todo[]> {
    return new Observable<Todo[]>();
  }

  addProject(name: string, description: string): Observable<Project> {
    return new Observable<Project>();
  }

  updateProject(project: Project): Observable<Project> {
    return new Observable<Project>();
  }

  deleteProject(id: number): Observable<void> {
    return new Observable<void>();
  }

  addTodoToProject(
    projectId: number,
    title: string,
    description: string
  ): Observable<Todo> {
    return new Observable<Todo>();
  }
}
