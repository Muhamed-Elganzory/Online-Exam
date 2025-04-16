import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {inject, Injectable} from '@angular/core';
import {DEV_URL} from '../../../Environments/development';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly httpClient: HttpClient = inject (HttpClient);
  private readonly cookieService: CookieService = inject (CookieService);

  getAllQuestionsOnExam (examId: string): Observable <any> {
    return this.httpClient.get(DEV_URL + `questions?exam=${examId}`, {
      headers: {
        TOKEN: this.cookieService.get('TOKEN')
      }
    });
  }
}
