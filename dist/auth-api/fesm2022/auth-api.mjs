import * as i0 from '@angular/core';
import { Injectable, InjectionToken, inject, signal } from '@angular/core';
import { map, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

class AuthApiEndpoints {
    static SIGNIN = 'auth/signin';
    static SIGNUP = 'auth/signup';
    static FORGET_PASSWORD = 'auth/forgotPassword';
    static VERIFY_CODE = 'auth/verifyResetCode';
    static RESET_PASSWORD = 'auth/resetPassword';
    static CHANGE_PASSWORD = 'auth/changePassword';
    static DELETE_ACCOUNT = 'auth/deleteMe';
    static EDITE_PROFILE = 'auth/editProfile';
    static LOGOUT = 'auth/logout';
    static GET_LOGGED_USER = 'auth/profileData';
}

class AuthAPIAdaptorService {
    constructor() { }
    adaptRes(data) {
        return {
            message: data.message,
            token: data.token,
            userEmail: data.user.email,
        };
    }
    adaptErr(data) {
        return {
            message: data.error.message,
        };
    }
    /**
     * It used of
     *   - FORGET PASSWORD
     *   - VERIFY CODE
     * @param data
     */
    adaptForgetPassRes(data) {
        return {
            message: data.message,
            info: data.info,
        };
    }
    adapt_VerifyCode_Err(data) {
        return {
            message: data.message
        };
    }
    adaptVerifyRes(data) {
        return {
            message: data.message,
        };
    }
    adaptResetPass(data) {
        return {
            message: data.message,
            token: data.token,
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AuthAPIAdaptorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AuthAPIAdaptorService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AuthAPIAdaptorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

const API_BASE_URL = new InjectionToken('API_BASE_URL', {
    providedIn: 'root',
    factory: () => 'https://exam.elevateegy.com/api/v1/'
});
/*
export interface BaseUrlConfig {
  baseURL: string;
}


    export const API_BASE_URL = new InjectionToken <string> ('API_BASE_URL');

    const injector: Injector = Injector.create({
      providers: [{
        provide: API_BASE_URL, useValue: 'https://exam.elevateegy.com/api/v1/',
      }]
    })
 */
/*
factory: () =>({
    LOGIN: 'https://exam.elevateegy.com/api/v1/auth/signin',
    REGISTER: 'https://exam.elevateegy.com/api/v1/auth/signup',
    CHANGE_PASSWORD: 'https://exam.elevateegy.com/api/v1/auth/changePassword',
    DELETE_ACCOUNT: 'https://exam.elevateegy.com/api/v1/auth/deleteMe',
    EDITE_PROFILE: 'https://exam.elevateegy.com/api/v1/auth/editProfile',
    LOGOUT: 'https://exam.elevateegy.com/api/v1/auth/logout',
    GET_LOGGED_USER: 'https://exam.elevateegy.com/api/v1/auth/profileData',
    FORGET_PASSWORD: 'https://exam.elevateegy.com/api/v1/auth/forgotPassword',
    VERIFY_CODE: 'https://exam.elevateegy.com/api/v1/auth/verifyResetCode',
    RESET_PASSWORD: 'https://exam.elevateegy.com/api/v1/auth/resetPassword',
  })
 */

class AuthApiService {
    httpClient = inject(HttpClient);
    authAPIAdaptorService = inject(AuthAPIAdaptorService);
    resetEmail = signal('');
    apiConfig = inject(API_BASE_URL);
    sigIn(data) {
        return this.httpClient.post(this.apiConfig + AuthApiEndpoints.SIGNIN, data).pipe(map((res) => this.authAPIAdaptorService.adaptRes(res)), catchError((err) => throwError(() => this.authAPIAdaptorService.adaptErr(err))));
    }
    signUp(data) {
        return this.httpClient.post(this.apiConfig + AuthApiEndpoints.SIGNUP, data).pipe(map((res) => this.authAPIAdaptorService.adaptRes(res)), catchError((err) => throwError(() => this.authAPIAdaptorService.adaptErr(err))));
    }
    forgetPassword(data) {
        return this.httpClient.post(this.apiConfig + AuthApiEndpoints.FORGET_PASSWORD, data).pipe(map((res) => this.authAPIAdaptorService.adaptForgetPassRes(res)), catchError((err) => throwError(() => this.authAPIAdaptorService.adaptErr(err))));
    }
    resetCode(data) {
        return this.httpClient.post(this.apiConfig + AuthApiEndpoints.VERIFY_CODE, data).pipe(map((res) => this.authAPIAdaptorService.adaptVerifyRes(res)), catchError((err) => throwError(() => this.authAPIAdaptorService.adapt_VerifyCode_Err(err))));
    }
    resetPassword(data) {
        return this.httpClient.put(this.apiConfig + AuthApiEndpoints.RESET_PASSWORD, data).pipe(map((res) => this.authAPIAdaptorService.adaptResetPass(res)), catchError((err) => throwError(() => this.authAPIAdaptorService.adaptErr(err))));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AuthApiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AuthApiService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "19.2.2", ngImport: i0, type: AuthApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

/*
 * Public API Surface of auth-api
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AuthApiService };
//# sourceMappingURL=auth-api.mjs.map
