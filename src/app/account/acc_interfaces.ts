export interface ILoginRequest {
    login: string;
    password: string;
  }
  
  export interface ILoginResponse {
    token: string;
    name: string;
  }

  export interface IRegisterRequest{
    email: string;
    password: string;
  }

  export interface IResetPasswordRequest{
    email:string;
  }

  export interface IResetPassword{
    email:string;
    newPassword:string;
    token:string;
  }

  export interface IToken{
    nameid:string,
    email:string,
    exp: string,
    role:string,
  }