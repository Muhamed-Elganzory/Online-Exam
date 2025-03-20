import { Adaptor } from '../interfaces/adaptor.interface';
import { SignInUpApiRes, SignInUpRes } from '../interfaces/auth/auth-api-res.interface';
import { SignInUpApiErr, SignInUpErr } from '../interfaces/auth/auth-api-err.interface';
import { ResetPasswordRes } from '../interfaces/resetPassword/reset-password-api.interface';
import * as i0 from "@angular/core";
export declare class AuthAPIAdaptorService implements Adaptor {
    constructor();
    adaptRes(data: SignInUpApiRes): SignInUpRes;
    adaptErr(data: SignInUpApiErr): SignInUpErr;
    /**
     * It used of
     *   - FORGET PASSWORD
     *   - VERIFY CODE
     * @param data
     */
    adaptForgetPassRes(data: any): any;
    adapt_VerifyCode_Err(data: any): any;
    adaptVerifyRes(data: any): any;
    adaptResetPass(data: ResetPasswordRes): ResetPasswordRes;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthAPIAdaptorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthAPIAdaptorService>;
}
