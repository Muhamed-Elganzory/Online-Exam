import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DEV_URL} from '../../../Environments/development';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly httpClient: HttpClient = inject (HttpClient);

  getAllQuestionsOnExam (examId: string): Observable <any> {
    return this.httpClient.get(DEV_URL + `questions?exam=${examId}`, {
      headers:{
        TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDk2OTBmNTU1NGIzMjg5MTI3MGZjMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQzOTMzNjI3fQ.68dpGKjiFo3r0H_beU5Fe3HF4x85nkLh7sWbNiR52-o'
      }
    });
  }
}
