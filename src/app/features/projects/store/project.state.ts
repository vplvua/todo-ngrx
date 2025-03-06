import { Project } from '../project.model';

export interface ProjectState {
  projects: Project[];
  selectedProjectId: string | null;
  error: string | null;
}

export const initialProjectState: ProjectState = {
  projects: [],
  selectedProjectId: null,
  error: null,
};
