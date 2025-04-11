import {Component, computed, inject, Signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {StoreAnswers} from '../../Model/store-answers';
import {StoreAnswersService} from '../../Service/store-answers.service';

@Component({
  selector: 'app-show-result',
  imports: [
    NgClass
  ],
  templateUrl: './show-result.component.html',
  styleUrl: './show-result.component.css'
})
export class ShowResultComponent {

  private storeAnswersService: StoreAnswersService = inject (StoreAnswersService);

  storeAnswers: Signal <StoreAnswers []> = computed((): StoreAnswers [] => this.storeAnswersService.storeAnswers());
  closeModalIsClose_Open: Signal<boolean> = computed((): boolean => this.storeAnswersService.closeModalIsClose_Open());


  closeModal(): void {
    this.storeAnswersService.answersIsReady.set(true);
    this.storeAnswersService.closeModalIsClose_Open.set(false);
  }
}
