import {createAction, props} from '@ngrx/store';
import {Mode} from './theme.model';

export const changeTheme  = createAction(
  '[Theme] Change Theme',
  props<{ primary: string | null; accent: string | null; mode: Mode | null }>()
);


