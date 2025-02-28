import { TodoState } from '../features/todos/store/todo.state';
import { ProjectState } from '../features/projects/store/project.state';
import { LoadingState } from './loading/loading.state';

export interface RootState {
  todos: TodoState;
  projects: ProjectState;
  loading: LoadingState;
}
