import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DEV_URL} from '../../../Environments/development';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private readonly httpClient: HttpClient = inject (HttpClient);

  getLimitOfSubjects(limit: any): Observable <any> {
    return this.httpClient.get(DEV_URL + `subjects?limit=${limit}`);
  }

  getAllSubjects(): Observable <any> {
    return this.httpClient.get(DEV_URL + 'subjects');
  }
}
