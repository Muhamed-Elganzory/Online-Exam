import {Component, computed, inject, OnDestroy, OnInit, Signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {Subject} from '../../Model/subject';
import {SubjectService} from '../../Service/subject.service';
import {SubjectCardComponent} from '../subject-card/subject-card.component';
import {SearchSubjectListPipe} from '../../../../Shared/Pipes/searchSubjectList.pipe';
import {SearchSignalService} from '../../../../Core/Layouts/Components/student-layout/Services/search-signal.service';

@Component({
  selector: 'app-subject-list',
  imports: [
    SubjectCardComponent,
    SearchSubjectListPipe,
  ],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.css'
})
export class SubjectListComponent implements OnInit, OnDestroy{

  private subscription!: Subscription;
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

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
