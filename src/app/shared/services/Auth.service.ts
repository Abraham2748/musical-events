import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authToken = ''; // Your authentication token

  getAuthToken(): string {
    // Logic to retrieve or store the token from localStorage or any other source
    return this.authToken;
  }
}
