import {ExamState} from './exam.state';
import {createReducer, on} from '@ngrx/store';
import * as ExamAction from './exam.action';

export const examInitialState: ExamState = {
  examStatus: "Not Started",
  isModalExamOpen: false
}

export const examReducer = createReducer (
  examInitialState,
  on(ExamAction.toggleModalExamOpen, (state) => ({
    ...state,
    isModalExamOpen: !state.isModalExamOpen
  }))
);
