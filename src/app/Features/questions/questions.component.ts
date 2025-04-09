import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  WritableSignal
} from '@angular/core';
import {ExamsService} from '../Exams/Service/exams.service';
import {Subscription} from 'rxjs';
import {QuestionService} from './Service/question.service';
import {Questions} from './Model/questions';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-questions',
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent implements OnInit, OnDestroy {

  private readonly examsService: ExamsService = inject (ExamsService);
  private readonly questionsService: QuestionService = inject (QuestionService);
  private readonly toastrService: ToastrService = inject (ToastrService);

  subscription!: Subscription;

  examId: Signal <string> = computed((): string => this.examsService.examID());

  intervalId: any;
  duration: number = 25; // Alternative Time Of API
  currentQuestion: number = 0;
  isCurrentQuestion: boolean = true;
  questionsList: Questions [] = [];
  timerOfExam: WritableSignal <string> = signal('00:00');

  ngOnInit(): void {
    this.getQuestions();
    this.startExam();
  }

  getQuestions(): void {
    this.subscription = this.questionsService.getAllQuestionsOnExam(this.examId()).subscribe({
      next: (res: any): void => {
        this.questionsList = res.questions;
        this.toastrService.success('Questions added successfully.');
        console.log(res);
        console.log(this.questionsList);
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
      } else {
        let minutes: number = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)); // 25
        let seconds: number = Math.floor((remainingTime % (1000 * 60)) / 1000);

        console.log(minutes);
        console.log(seconds);
        console.log(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
        this.timerOfExam.set(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
      }
    }, 1000);
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
