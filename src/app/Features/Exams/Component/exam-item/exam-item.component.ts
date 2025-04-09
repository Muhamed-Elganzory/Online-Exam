import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Exams} from '../../Model/exams';

@Component({
  selector: 'app-exam-item',
  imports: [],
  templateUrl: './exam-item.component.html',
  styleUrl: './exam-item.component.css'
})
export class ExamItemComponent {

  @Input() exams: Exams = {} as Exams;
  @Output() examId: EventEmitter <string> = new EventEmitter <string> ();
  @Output() modalToggled: EventEmitter <boolean> = new EventEmitter <boolean> ();

  _modalIsOpen: boolean = false;
  _examId: string = '';

  modalIsOpen(): void{
    this._modalIsOpen = !this._modalIsOpen;
    this.modalToggled.emit(this._modalIsOpen);
    this.emitExamId();
  }

  emitExamId(): void{
    this._examId = this.exams._id;
    this.examId.emit(this._examId);
  }
}
