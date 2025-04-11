import {Component, computed, EventEmitter, inject, Input, Output, Signal} from '@angular/core';
import {Exams} from '../../Model/exams';
import {StoreAnswersService} from '../../../questions/Service/store-answers.service';

@Component({
  selector: 'app-exam-item',
  imports: [],
  templateUrl: './exam-item.component.html',
  styleUrl: './exam-item.component.css'
})
export class ExamItemComponent {

  @Input() exams: Exams = {} as Exams;
  @Output() examId: EventEmitter <string> = new EventEmitter <string> ();
  @Output() _showResult: EventEmitter <boolean> = new EventEmitter <boolean> ();
  @Output() modalToggled: EventEmitter <boolean> = new EventEmitter <boolean> ();

  private readonly storeAnswersService: StoreAnswersService = inject(StoreAnswersService);

  answersIsReady: Signal <boolean> = computed((): boolean => this.storeAnswersService.answersIsReady());

  _examId: string = '';
  _modalIsOpen: boolean = false;

  modalIsOpen(): void{
    this._modalIsOpen = !this._modalIsOpen;
    this.modalToggled.emit(this._modalIsOpen);
    this.emitExamId();
  }

  emitExamId(): void{
    this._examId = this.exams._id;
    this.examId.emit(this._examId);
  }

  showResult(): void {
    this.storeAnswersService.closeModalIsClose_Open.set(true);
    console.log('showResult');
  }
}
