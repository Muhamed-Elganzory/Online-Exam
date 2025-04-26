
export type examStatus = 'Not Started' | 'Started' | 'Completed' | 'Review Answer' | 'Closed';

export interface ExamState {
  examStatus: examStatus,
  isModalExamOpen: boolean;
}
