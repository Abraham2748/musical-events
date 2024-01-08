import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './Auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private authService: AuthService) {}
  private baseUrl = 'http://localhost:8080/api/'; // Set your base URL here

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getHeaders(): HttpHeaders {
    const authToken = this.authService.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });
  }
}
