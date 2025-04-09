import {Component, Input} from '@angular/core';
import {Subject} from '../../Model/subject';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-subject-card',
  imports: [
    RouterLink
  ],
  templateUrl: './subject-card.component.html',
  styleUrl: './subject-card.component.css'
})
export class SubjectCardComponent {

  @Input() subject!: Subject;

}
