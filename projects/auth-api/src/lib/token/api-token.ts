import {InjectionToken} from '@angular/core';

export interface BaseUrlConfig {
  baseURL: string;
}

export const API_BASE_URL = new InjectionToken <{[key: string]: string}> ('API_BASE_URL', {
  providedIn: 'root',
  factory: () => ({
    baseURL:'https://exam.elevateegy.com/api/v1/'
  })
});

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
