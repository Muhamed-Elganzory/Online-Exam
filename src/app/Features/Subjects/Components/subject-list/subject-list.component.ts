import {Component, computed, inject, OnDestroy, OnInit, Signal} from '@angular/core';
import {SubjectCardComponent} from '../subject-card/subject-card.component';
import {SubjectService} from '../../Service/subject.service';
import {Subscription} from 'rxjs';
import {Subject} from '../../Model/subject';
import {SearchSignalService} from '../../../../Core/Layouts/Components/student-layout/Services/search-signal.service';
import {SearchPipe} from '../../../../Shared/Pipes/search.pipe';
import {ExamsService} from '../../../Exams/Service/exams.service';

@Component({
  selector: 'app-subject-list',
  imports: [
    SubjectCardComponent,
    SearchPipe,
  ],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.css'
})
export class SubjectListComponent implements OnInit, OnDestroy{

  private subscription!: Subscription;
  // private readonly examsService: ExamsService = inject (ExamsService);
  private readonly subjectService: SubjectService = inject (SubjectService);
  private readonly searchSignalService: SearchSignalService = inject (SearchSignalService);

  searchTerm: Signal <string> = computed((): string => this.searchSignalService.searchSignal());

  limitOfSubjects: number = 6;
  subjectList: Subject [] = [];

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.getLimitOfSubjects(this.limitOfSubjects);
  }

  getLimitOfSubjects(limit: number): void {
    const subjectService: Subscription = this.subjectService.getLimitOfSubjects(limit).subscribe({
      next: (res: any): void => {
        this.subjectList = res.subjects;
      }
    })
    this.subscription.add(subjectService);
  }

  getAllSubjects(): void {
    const subjectService: Subscription = this.subjectService.getAllSubjects().subscribe({
      next: (res: any): void => {
        this.subjectList = res.subjects;
      }
    })
    this.subscription.add(subjectService);
  }

  /*
      getAllExamsOnSubject(subjectID: string): void{
        console.log(subjectID);
        const examsService: Subscription = this.examsService.getAllExamsOnSubject(subjectID).subscribe({
          next: (res: any): void => {
            console.log(subjectID);
            console.log(res);
          }
        });
        // this.subscription.add(examsService);
      }
  */

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
