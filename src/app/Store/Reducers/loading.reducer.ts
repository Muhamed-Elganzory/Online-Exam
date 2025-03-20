import {createReducer, on} from '@ngrx/store';
import {setLoadingValue} from '../Actions/loading.action';

const INITIAL_STATE : boolean = false;

export const loadingReducer = createReducer (
  INITIAL_STATE,
  on(setLoadingValue, (_state: boolean, action: {value: boolean}): boolean => action.value)
);
