import {createAction, props} from '@ngrx/store';

const SET_LOADING_VALUE: string = '[Loading] setLoadingValue';

export const setLoadingValue = createAction(
  SET_LOADING_VALUE,
  props<{ value: boolean }>()
)
