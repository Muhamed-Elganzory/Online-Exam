import { WritableSignal } from '@angular/core';
import { AuthApi } from './base/auth.api.abstract';
import { Observable } from 'rxjs';
import { SignInData } from './interfaces/auth/sign-in-data.interface';
import { SignInUpRes } from './interfaces/auth/auth-api-res.interface';
import { SignUpData } from './interfaces/auth/sign-up-data.interface';
import { ForgetPasswordData } from './interfaces/forgetPassword/forget-password-data.interface';
import { ForgetPasswordRes } from './interfaces/forgetPassword/forget-password-api.interface';
import { VerifyCodeData } from './interfaces/verifyCode/verify-code.data.interface';
import { VerifyCodeRes } from './interfaces/verifyCode/verify-code-api.interface';
import { ResetPasswordData } from './interfaces/resetPassword/reset-password-data.interface';
import { ResetPasswordRes } from './interfaces/resetPassword/reset-password-api.interface';
import * as i0 from "@angular/core";
export declare class AuthApiService implements AuthApi {
    private readonly httpClient;
    private readonly authAPIAdaptorService;
    resetEmail: WritableSignal<string>;
    private readonly apiConfig;
    sigIn(data: SignInData): Observable<SignInUpRes>;
    signUp(data: SignUpData): Observable<SignInUpRes>;
    forgetPassword(data: ForgetPasswordData): Observable<ForgetPasswordRes>;
    resetCode(data: VerifyCodeData): Observable<VerifyCodeRes>;
    resetPassword(data: ResetPasswordData): Observable<ResetPasswordRes>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthApiService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthApiService>;
}
