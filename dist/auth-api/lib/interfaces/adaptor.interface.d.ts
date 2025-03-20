export interface Adaptor {
    adaptRes(data: any): any;
    adaptErr(data: any): any;
    adaptForgetPassRes(data: any): any;
    adapt_VerifyCode_Err(data: any): any;
    adaptVerifyRes(data: any): any;
    adaptResetPass(data: any): any;
}
