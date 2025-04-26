import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ExamState} from './exam.state';

export const selectExamState = createFeatureSelector <ExamState> ('exam');

export const selectExamModal = createSelector(
  selectExamState,
  (state) => state.isModalExamOpen
)
