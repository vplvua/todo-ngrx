import { createAction, createActionGroup, emptyProps } from '@ngrx/store';

export const LoadingActions = createActionGroup({
  source: 'Loading',
  events: {
    'Increment pending requests': emptyProps(),
    'Decrement pending requests': emptyProps(),
    'Set loading state': emptyProps(),
  },
});
