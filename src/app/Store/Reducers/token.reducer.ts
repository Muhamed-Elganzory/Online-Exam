import {createReducer, on} from '@ngrx/store';
import {setToken} from '../Actions/token.action';

const INITIAL_STATE: string = '';

export const tokenReducer = createReducer(
  INITIAL_STATE,
  on(setToken, (_state: string, action: {value: string}): string => action.value),
)
