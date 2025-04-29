import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginApiResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post<LoginApiResponse>(this.baseUrl + 'users/login', {
      username: email,
      password: password,
    });
  }
}
