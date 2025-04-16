import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Subject} from '../../Model/subject';

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
