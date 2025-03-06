import { TodoState } from '../features/todos/store/todo.state';
import { ProjectState } from '../features/projects/store/project.state';
import { LoadingState } from './loading/loading.state';
import { ActionReducerMap } from '@ngrx/store';
import { todoReducer } from '../features/todos/store/todo.reducer';
import { loadingReducer } from './loading/loading.reducer';
import { projectReducer } from '../features/projects/store/project.reducer';

export interface RootState {
  todos: TodoState;
  projects: ProjectState;
  loading: LoadingState;
}

export const rootReducer: ActionReducerMap<RootState> = {
  todos: todoReducer,
  projects: projectReducer,
  loading: loadingReducer,
};
