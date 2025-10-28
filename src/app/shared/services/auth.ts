import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginApiResponse } from '../models/auth.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = 'http://localhost:8080/api/';
  private http = inject(HttpClient);

  private tokenExpiration = new Date();

  private role = '';
  private email = '';
  private name = '';

  private isLoggedIn = false;

  private router = inject(Router);

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

  decodeToken() {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (!token || !tokenExpiration) return;

    this.tokenExpiration = new Date(tokenExpiration);

    const jsonWebTokenDecoded = jwtDecode<any>(token);

    this.role = jsonWebTokenDecoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.email =
      jsonWebTokenDecoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    this.name = jsonWebTokenDecoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

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
      alert('Token expirado');
      this.router.navigateByUrl('/login');
    } else {
      alert('Logout exitoso');
      this.router.navigateByUrl('/');
    }
  }
}
