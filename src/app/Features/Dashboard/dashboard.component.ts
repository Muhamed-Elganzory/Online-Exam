import { Component } from '@angular/core';
import {SubjectListComponent} from '../Subjects/Components/subject-list/subject-list.component';

@Component({
  selector: 'app-Dashboard',
  imports: [
    SubjectListComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
