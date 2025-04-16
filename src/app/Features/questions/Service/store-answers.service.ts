import {Injectable, signal, WritableSignal} from '@angular/core';
import {StoreAnswers} from '../Model/store-answers';

@Injectable({
  providedIn: 'root'
})
export class StoreAnswersService {

  answersIsReady: WritableSignal <boolean> = signal <boolean> (false);
  closeModalIsClose_Open: WritableSignal <boolean> = signal <boolean> (true);
  storeAnswers: WritableSignal <StoreAnswers []> = signal <StoreAnswers []> ([]);
}
