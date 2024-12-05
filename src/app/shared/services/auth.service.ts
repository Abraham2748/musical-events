import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  LoginApiResponse,
  RegisterRequestBody,
  ResetPasswordRequestBody,
} from '../models/auth.model';
import { catchError, EMPTY } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  private email = '';
  private name = '';
  private role = '';
  private tokenExpiration = new Date();

  private isLoggedIn = false;

  getEmail() {
    return this.email;
  }
  getName() {
    return this.name;
  }
  getRole() {
    return this.role;
  }
  getTokenExpiration() {
    return this.tokenExpiration;
  }
  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginApiResponse>(this.baseUrl + 'users/login', {
        username: email,
        password,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Error: ' + error.error.errorMessage);
          return EMPTY;
        })
      );
  }

  decodeToken() {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (!token || !tokenExpiration) return;

    const jwtDecoded = jwtDecode<any>(token);

    this.role =
      jwtDecoded[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    this.email =
      jwtDecoded[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ];

    this.name =
      jwtDecoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

    this.tokenExpiration = new Date(tokenExpiration);

    this.isLoggedIn = true;
  }

  logout() {
    localStorage.clear();
    this.email = '';
    this.name = '';
    this.role = '';
    this.isLoggedIn = false;
    alert('Logout exitoso');
    this.router.navigate(['/']);
  }

  register(body: RegisterRequestBody) {
    return this.http.post(this.baseUrl + 'users/register', body).pipe(
      catchError((error: HttpErrorResponse) => {
        alert('Error: ' + error.error.errorMessage);
        return EMPTY;
      })
    );
  }

  sendToken(email: string) {
    return this.http
      .post(this.baseUrl + 'users/RequestTokenToResetPassword', {
        email,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Error: ' + error.error.errorMessage);
          return EMPTY;
        })
      );
  }

  resetPassword(body: ResetPasswordRequestBody) {
    return this.http.post(this.baseUrl + 'users/ResetPassword', body).pipe(
      catchError((error: HttpErrorResponse) => {
        alert('Error: ' + error.error.errorMessage);
        return EMPTY;
      })
    );
  }
}
