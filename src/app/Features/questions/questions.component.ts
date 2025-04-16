import {Component, computed, inject, Input, OnDestroy, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {Subscription} from 'rxjs';
import {NgClass} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreAnswers} from './Model/store-answers';
import {Answer, Questions} from './Model/questions';
import {QuestionService} from './Service/question.service';
import {ExamsService} from '../Exams/Service/exams.service';
import {StoreAnswersService} from './Service/store-answers.service';
import {ScoreComponent} from './Components/your-score/score.component';

@Component({
  selector: 'app-questions',
  imports: [
    NgClass,
    ScoreComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  private readonly examsService: ExamsService = inject (ExamsService);
  private readonly toastrService: ToastrService = inject (ToastrService);
  private readonly questionsService: QuestionService = inject (QuestionService);
  private readonly storeAnswersService: StoreAnswersService = inject (StoreAnswersService);

  timerOfExam: WritableSignal <string> = signal('00:00');
  examId: Signal <string> = computed((): string => this.examsService.examID());

  intervalId: any;
  otherAnswer:any;
  duration: number = 0.2; // Alternative Time Of API
  correctAnswer: string = '';
  currentQuestion: number = 0;
  questionsList: Questions [] = [];
  isCurrentQuestion: boolean = true;

  @Input() _examModalIsOpen: boolean = false;

  _modalYourScoreIsOpen: boolean = false;

  ngOnInit(): void {
    this.getQuestions();
    this.startExam();
  }

  getQuestions(): void {
    this.subscription = this.questionsService.getAllQuestionsOnExam(this.examId()).subscribe({
      next: (res: any): void => {
        this.questionsList = res.questions;
        this.toastrService.success('Questions added successfully.');
      }
    })
  }

  startExam (): void {

    const startTime: number = new Date().getTime(); // 3:00:00
    const duration: number = this.duration * 60 * 1000; // 1,500,000
    const endTime: number = startTime + duration; // 3:00:00 + 25 = 3:25:00

    this.intervalId = setInterval((): void => {

      const now: number = new Date().getTime(); // 3:10:00
      const remainingTime: number = endTime - now; // 3:35:00 - // 3:10:00 = 25

      if(remainingTime <= 0) {
        this.timerOfExam.set('00:00');
        clearInterval(this.intervalId);
        this._examModalIsOpen = false;
        this._modalYourScoreIsOpen = true;
      } else {
        let minutes: number = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)); // 25
        let seconds: number = Math.floor((remainingTime % (1000 * 60)) / 1000);

        this.timerOfExam.set(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
      }
    }, 1000);
  }

  questionOfChosen(question: string,  keyOfCorrectAnswer: string, userAnswer: string, keyOfUserAnswer: string): void {
    let _countOfCorrectAnswers: number = 0;
    let _countOfIncorrectAnswers: number = 0;

    this.correctAnswer = this.questionsList[this.currentQuestion].answers.find((answer: Answer): boolean => answer.key === keyOfCorrectAnswer)?.answer || '';
    this.otherAnswer = this.questionsList[this.currentQuestion].answers.filter((answer: Answer): boolean => answer.answer != this.correctAnswer && answer.answer != userAnswer);

    if(keyOfUserAnswer === keyOfCorrectAnswer) {
      _countOfCorrectAnswers++;
    } else {
      _countOfIncorrectAnswers++;
    }

    this.storeAnswersService.storeAnswers.update((previousAnswer: StoreAnswers[]): StoreAnswers[] => [...previousAnswer, {
      question: question,
      correctAnswer: this.correctAnswer,
      keyOfCorrectAnswer: keyOfCorrectAnswer,
      userAnswer: userAnswer,
      keyOfUserAnswer: keyOfUserAnswer,
      countOfCorrectAnswers: _countOfCorrectAnswers,
      countOfIncorrectAnswers: _countOfIncorrectAnswers,
      otherAnswer: this.otherAnswer
    }]);
  }


  nextQuestion(): void {
    if(this.currentQuestion + 1 <= this.questionsList.length - 1) {
      this.currentQuestion++;
      this.isCurrentQuestion = true;
    } else {
      this.toastrService.error('No more questions!', 'End of Exam', {
        timeOut: 2000,
        progressBar: true,
      });
      return
    }
  }

  previousQuestion (): void {
    if(this.currentQuestion + 1 > 1) {
      this.currentQuestion--;
    } else {
      this.toastrService.info('That\'s the first question already', 'Attention', {
        timeOut: 2000,
        progressBar: true,
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
