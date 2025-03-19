import { Injectable } from '@angular/core';
import {Adaptor} from '../interfaces/adaptor.interface';
import {SignInUpApiRes, SignInUpRes} from '../interfaces/auth/auth-api-res.interface';
import {SignInUpApiErr, SignInUpErr} from '../interfaces/auth/auth-api-err.interface';
import {ResetPasswordRes} from '../interfaces/resetPassword/reset-password-api.interface';
import {ForgetPasswordRes} from '../interfaces/forgetPassword/forget-password-api.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIAdaptorService implements Adaptor {

  constructor() { }

  adaptRes(data: SignInUpApiRes): SignInUpRes {
    return {
      message: data.message,
      token: data.token,
      userEmail: data.user.email,
    };
  }

  adaptErr(data: SignInUpApiErr): SignInUpErr {
    return {
      message: data.error.message,
    }
  }

  /**
   * It used of
   *   - FORGET PASSWORD
   *   - VERIFY CODE
   * @param data
   */
  adaptForgetPassRes(data: any): any {
    return {
      message: data.message,
      info: data.info,
    }
  }

  adapt_VerifyCode_Err(data: any): any {
    return {
      message: data.message
    }
  }

  adaptVerifyRes(data: any): any {
    return {
      message: data.message,
    }
  }

  adaptResetPass(data: ResetPasswordRes): ResetPasswordRes {
    return {
      message: data.message,
      token: data.token,
    };
  }


}
