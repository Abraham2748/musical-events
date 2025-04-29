import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HomeApiResponse } from '../../home/home.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = 'http://localhost:8080/api/';
  private http = inject(HttpClient);

  getData() {
    return this.http.get<HomeApiResponse>(this.baseUrl + 'home');
  }
}
