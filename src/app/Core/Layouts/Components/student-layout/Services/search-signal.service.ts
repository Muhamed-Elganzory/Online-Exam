import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchSignalService {

  searchSignal: WritableSignal <string> = signal <string> ('');

}
