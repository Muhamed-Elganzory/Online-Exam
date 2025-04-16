import {Answer} from './questions';

export interface StoreAnswers {
  question: string
  correctAnswer: string
  keyOfCorrectAnswer: string
  userAnswer: string
  keyOfUserAnswer: string
  countOfCorrectAnswers: number
  countOfIncorrectAnswers: number
  otherAnswer: Answer[]
}
