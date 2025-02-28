import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Project } from '../project.model';

export interface ProjectState extends EntityState<Project> {
  selectedProjectId: number | null;
  loading: boolean;
  error: string | null;
}

export const projectAdapter: EntityAdapter<Project> =
  createEntityAdapter<Project>({
    selectId: (project: Project) => project.id,
    sortComparer: (a: Project, b: Project) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  });

export const initialProjectState: ProjectState = projectAdapter.getInitialState(
  {
    selectedProjectId: null,
    loading: false,
    error: null,
  }
);
