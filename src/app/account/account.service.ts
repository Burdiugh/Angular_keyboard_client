import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IResetPassword,
  IResetPasswordRequest,
  IToken,
} from './acc_interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl: string = 'https://localhost:7059/api/';
  private readonly tokenKey: string = 'tokenKey';

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  login(model: ILoginRequest): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(
      this.apiUrl + 'account/login',
      model
    );
  }

  isAuth(): boolean {
    return localStorage.getItem(this.tokenKey) != null;
  }

  logout(): void {
    this.httpClient.post(this.apiUrl + 'account/logout', null);
    this.removeToken();
  }

  register(model: IRegisterRequest): Observable<object> {
    let result = this.httpClient.post(this.apiUrl + 'account/register', model);
    return result;
  }

  resetPasswordRequest(model: IResetPasswordRequest): Observable<object> {
    return this.httpClient.post(
      this.apiUrl + 'account/request-password-reset',
      model
    );
  }

  resetPassword(model: IResetPassword): Observable<object> {
    return this.httpClient.post(this.apiUrl + 'account/reset-password', model);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  removeToken(): void {
    return localStorage.removeItem(this.tokenKey);
  }
  getDecodedAccessToken(): IToken | null {
    let token = this.getToken();
    try {
      if (token) return this.jwtHelper.decodeToken(token);
    } catch (Error) {
      return null;
    }
    return null;
  }
}
