import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecureAccessService {

  signal: WritableSignal <string> =  signal <string> ('');

}
