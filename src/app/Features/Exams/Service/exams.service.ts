import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DEV_URL} from '../../../Environments/development';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  private readonly httpClient: HttpClient = inject (HttpClient);

  examID: WritableSignal <string> =  signal <string> ('');

  getAllExamsOnSubject(subjectId: any): Observable <any> {
    return this.httpClient.get(DEV_URL + `exams?subject=${subjectId}`);
  }

}
