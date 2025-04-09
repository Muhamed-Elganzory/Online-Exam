import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ExamsService} from '../../Service/exams.service';
import {ActivatedRoute, ParamMap, Router, RouterLink} from '@angular/router';
import {Exams} from '../../Model/exams';
import {Subscription} from 'rxjs';
import {ExamItemComponent} from '../exam-item/exam-item.component';
import {QuestionsComponent} from '../../../questions/questions.component';

@Component({
  selector: 'app-exam-list',
  imports: [
    ExamItemComponent,
    QuestionsComponent,
    // RouterLink
  ],
  templateUrl: './exam-list.component.html',
  styleUrl: './exam-list.component.css'
})
export class ExamListComponent implements OnInit, OnDestroy {

  private readonly subscription: Subscription = new Subscription();
  private readonly examsService: ExamsService = inject (ExamsService);
  private readonly activatedRoute: ActivatedRoute = inject (ActivatedRoute);

  exams: Exams[] = [];
  examID: string = '';
  _catchSubjectId: string = '';
  _modalIsOpen: boolean = false;
  _examModalOpen: boolean = false;

  ngOnInit(): void {
    this.catchSubjectID();
    this.getAllExamsOnSubject(this._catchSubjectId);
  }

  getAllExamsOnSubject(subjectId: string): void {
    this.examsService.getAllExamsOnSubject(subjectId).subscribe({
      next: (result: any): void => {
        this.exams = result.exams;
      }
    })
  }

  catchSubjectID(): Subscription {
    return this.activatedRoute.paramMap.subscribe({
      next: (url: any): void => {
        this._catchSubjectId = url.get('subjectId');
      }
    })
  }

  modalIsOpen(val: boolean): void{
    this._modalIsOpen = val;
  }

  storeExamId(examId: string): void{
    this.examsService.examID.set(examId);
    this.examID = examId;
  }

  goToExam (): void {
    this._modalIsOpen = false;
    this._examModalOpen = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
