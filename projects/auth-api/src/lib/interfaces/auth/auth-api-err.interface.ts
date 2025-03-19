export interface SignInUpApiErr {
  error: {
    code: number,
    message: string
  },
  headers: {
    "content-length": string[],
    "content-type": string[]
  },
  message: string,
  name: string,
  ok: boolean,
  status: number,
  statusText: string,
  url: string,
}

export interface SignInUpErr {
  message: string
}
