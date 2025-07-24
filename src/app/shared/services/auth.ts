import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginApiResponse, RegisterRequestBody } from '../models/auth.model';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = 'http://localhost:8080/api/';
  private http = inject(HttpClient);

  private tokenExpiration = signal(new Date());

  private role = signal('');
  private email = signal('');
  private name = signal('');

  private isLoggedIn = signal(false);

  private router = inject(Router);

  getEmail() {
    return this.email();
  }

  getName() {
    return this.name();
  }

  getRole() {
    return this.role();
  }

  getTokenExpiration() {
    return this.tokenExpiration();
  }

  getIsLoggedIn() {
    return this.isLoggedIn();
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

  sendTokenToResetPassword(email: string) {
    return this.http.post(this.baseUrl + 'users/RequestTokenToResetPassword', {
      email,
    });
  }

  decodeToken() {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (!token || !tokenExpiration) return;

    this.tokenExpiration.set(new Date(tokenExpiration));

    const jwtDecoded = jwtDecode<any>(token);

    this.role.set(
      jwtDecoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    );
    this.email.set(
      jwtDecoded[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ]
    );
    this.name.set(
      jwtDecoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    );

    this.isLoggedIn.set(true);
  }

  logout(tokenExpired = false) {
    localStorage.clear();
    this.name.set('');
    this.email.set('');
    this.role.set('');
    this.tokenExpiration.set(new Date());
    this.isLoggedIn.set(false);
    if (tokenExpired) {
      alert('Token expirado, inicio sesión por favor');
      this.router.navigateByUrl('/login');
    } else {
      alert('Logout exitoso');
      this.router.navigateByUrl('/');
    }
  }
}
