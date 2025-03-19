import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {AuthApi} from './base/auth.api.abstract';
import {catchError, map, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthApiEndpoints} from './enums/auth-api.endpoints';
import {AuthAPIAdaptorService} from './adaptor/auth-api.adaptor';
import {SignInData} from './interfaces/auth/sign-in-data.interface';
import {SignInUpRes} from './interfaces/auth/auth-api-res.interface';
import {SignInUpApiErr, SignInUpErr} from './interfaces/auth/auth-api-err.interface';
import {SignUpData} from './interfaces/auth/sign-up-data.interface';
import {ForgetPasswordData} from './interfaces/forgetPassword/forget-password-data.interface';
import {ForgetPasswordRes} from './interfaces/forgetPassword/forget-password-api.interface';
import {VerifyCodeData} from './interfaces/verifyCode/verify-code.data.interface';
import {VerifyCodeRes} from './interfaces/verifyCode/verify-code-api.interface';
import {ResetPasswordData} from './interfaces/resetPassword/reset-password-data.interface';
import {ResetPasswordRes} from './interfaces/resetPassword/reset-password-api.interface';
import {API_BASE_URL} from './token/api-token';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AuthApi {

  private readonly httpClient: HttpClient = inject (HttpClient);
  private readonly authAPIAdaptorService: AuthAPIAdaptorService = inject (AuthAPIAdaptorService);
  resetEmail: WritableSignal <string> = signal <string> ('');
  private readonly apiConfig: string = inject (API_BASE_URL);

  sigIn(data: SignInData): Observable <SignInUpRes> {
    return this.httpClient.post(this.apiConfig + AuthApiEndpoints.SIGNIN, data).pipe(
      map((res: any): SignInUpRes => this.authAPIAdaptorService.adaptRes(res)),
      catchError((err: SignInUpApiErr): Observable <any> => throwError((): SignInUpErr => this.authAPIAdaptorService.adaptErr(err))),
    );
  }

  signUp(data: SignUpData): Observable <SignInUpRes> {
    return this.httpClient.post(this.apiConfig + AuthApiEndpoints.SIGNUP, data).pipe(
      map((res: any): SignInUpRes => this.authAPIAdaptorService.adaptRes(res)),
      catchError((err: SignInUpApiErr): Observable <any> => throwError((): SignInUpErr => this.authAPIAdaptorService.adaptErr(err)))
    );
  }

  forgetPassword(data: ForgetPasswordData): Observable <ForgetPasswordRes> {
    return this.httpClient.post(this.apiConfig + AuthApiEndpoints.FORGET_PASSWORD, data).pipe(
      map((res: any): ForgetPasswordRes => this.authAPIAdaptorService.adaptForgetPassRes(res)),
      catchError((err: SignInUpApiErr): Observable <any> => throwError((): SignInUpErr => this.authAPIAdaptorService.adaptErr(err)))
    );
  }

  resetCode(data: VerifyCodeData): Observable <VerifyCodeRes> {
    return this.httpClient.post(this.apiConfig + AuthApiEndpoints.VERIFY_CODE, data).pipe(
      map((res: any): ForgetPasswordRes => this.authAPIAdaptorService.adaptVerifyRes(res)),
      catchError((err: ForgetPasswordRes): Observable <any> => throwError((): ForgetPasswordRes => this.authAPIAdaptorService.adapt_VerifyCode_Err(err)))
    );
  }

  resetPassword(data: ResetPasswordData): Observable <ResetPasswordRes> {
    return this.httpClient.put(this.apiConfig + AuthApiEndpoints.RESET_PASSWORD, data).pipe(
      map((res: any): ResetPasswordRes => this.authAPIAdaptorService.adaptResetPass(res)),
      catchError((err: any): Observable <any> => throwError((): SignInUpErr => this.authAPIAdaptorService.adaptErr(err)))
    );
  }
}
