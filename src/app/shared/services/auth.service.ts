import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  LoginApiResponse,
  RegisterRequestBody,
  ResetPasswordRequestBody,
} from '../models/auth.model';
import { jwtDecode } from 'jwt-decode';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/';
  private http = inject(HttpClient);

  private email = '';
  private name = '';
  private role = '';
  private tokenExpiration = new Date();

  private isLoggedIn = false;
  notifications = inject(NotificationsService);
  router = inject(Router);

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
    return this.http.post<LoginApiResponse>(this.baseUrl + 'users/login', {
      username: email,
      password,
    });
  }

  register(body: RegisterRequestBody) {
    return this.http.post(this.baseUrl + 'users/register', body);
  }

  decodeToken() {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (!token || !tokenExpiration) return;

    this.tokenExpiration = new Date(tokenExpiration);
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

    this.isLoggedIn = true;
  }

  logout(tokenExpired = false) {
    localStorage.clear();
    this.email = '';
    this.name = '';
    this.role = '';
    this.tokenExpiration = new Date();
    this.isLoggedIn = false;
    if (tokenExpired) {
      this.notifications.error('Token Expirado', 'Por favor inicia sesión');
    } else {
      this.notifications.info('Logout', 'Logout exitoso');
    }
    this.router.navigateByUrl('/');
  }

  sendTokenToResetPassword(email: string) {
    return this.http.post(this.baseUrl + 'users/RequestTokenToResetPassword', {
      email,
    });
  }

  resetPassword(body: ResetPasswordRequestBody) {
    return this.http.post(this.baseUrl + 'users/ResetPassword', body);
  }
}
