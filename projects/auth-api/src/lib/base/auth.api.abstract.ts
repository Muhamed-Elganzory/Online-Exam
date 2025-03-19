import {Observable} from 'rxjs';

export abstract class AuthApi {

  abstract sigIn (data: any): Observable <any>
  abstract signUp (data: any): Observable <any>
  abstract forgetPassword (data: any): Observable <any>
  abstract resetCode (data: any): Observable <any>
  abstract resetPassword (data: any): Observable <any>

}
