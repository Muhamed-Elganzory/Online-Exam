import {createAction, props} from '@ngrx/store';

export const setToken = createAction(
  '[Token] setToken',
  props <{value: string}> ()
)
