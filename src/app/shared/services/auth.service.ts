import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginApiResponse } from '../models/auth.model';
import { catchError, EMPTY } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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

    console.log(jwtDecoded);

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
  }
}
