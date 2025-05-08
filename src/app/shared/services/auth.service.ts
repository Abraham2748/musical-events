import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  LoginApiResponse,
  RegisterRequestBody,
  ResetPasswordRequestBody,
} from '../models/auth.model';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  private email = '';
  private name = '';
  private role = '';
  private tokenExpiration = new Date();

  private isLoggedIn = false;

  router = inject(Router);
  notifications = inject(NotificationsService);

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
      password: password,
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
    this.name = '';
    this.email = '';
    this.role = '';
    this.tokenExpiration = new Date();
    this.isLoggedIn = false;

    if (tokenExpired) {
      this.notifications.warn('Token Expirado. Por favor inicia sesión');
      this.router.navigateByUrl('/login');
    } else {
      this.notifications.success('Logout exitoso', 'Vuelve pronto');
      this.router.navigateByUrl('/');
    }
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
