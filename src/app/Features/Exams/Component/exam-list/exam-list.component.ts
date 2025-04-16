import {Component, computed, inject, OnDestroy, OnInit, Signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {Exams} from '../../Model/exams';
import {ActivatedRoute} from '@angular/router';
import {ExamsService} from '../../Service/exams.service';
import {ExamItemComponent} from '../exam-item/exam-item.component';
import {QuestionsComponent} from '../../../questions/questions.component';
import {SearchExamListPipe} from '../../../../Shared/Pipes/search-exam-list.pipe';
import {SearchSignalService} from '../../../../Core/Layouts/Components/student-layout/Services/search-signal.service';

@Component({
  selector: 'app-exam-list',
  imports: [
    ExamItemComponent,
    QuestionsComponent,
    SearchExamListPipe,
  ],
  templateUrl: './exam-list.component.html',
  styleUrl: './exam-list.component.css'
})
export class ExamListComponent implements OnInit, OnDestroy {

  private readonly subscription: Subscription = new Subscription();
  private readonly examsService: ExamsService = inject (ExamsService);
  private readonly activatedRoute: ActivatedRoute = inject (ActivatedRoute);
  private readonly searchSignalService: SearchSignalService = inject (SearchSignalService);

  searchTerm: Signal <string> = computed((): string => this.searchSignalService.searchSignal());

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
