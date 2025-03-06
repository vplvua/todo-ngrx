import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Project } from '../project.model';
import { Todo } from '../../todos/todo.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${id}`);
  }

  getProjectTodos(projectId: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/projects/${projectId}/todos`);
  }

  addProject(name: string, description: string): Observable<Project> {
    const project: Partial<Project> = {
      name,
      description,
      createdAt: new Date(),
    };

    return this.http.post<Project>(`${this.apiUrl}/projects`, project);
  }

  updateProject(project: Project): Observable<Project> {
    const updatedProject = {
      ...project,
      updatedAt: new Date(),
    };

    return this.http.put<Project>(`${this.apiUrl}/projects/${project.id}`, updatedProject);
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projects/${id}`);
  }

  addTodoToProject(projectId: string, title: string, description: string): Observable<Todo> {
    const todo: Partial<Todo> = {
      title,
      description,
      completed: false,
      projectId,
      createdAt: new Date(),
    };

    return this.http.post<Todo>(`${this.apiUrl}/projects/${projectId}/todos`, todo);
  }
}
