export interface ForgetPasswordApiRes {
  type: string
  properties: {
    message: { type: string }
    info: { type: string }
  }
}

export interface ForgetPasswordRes {
  message: string
  info: string
}
