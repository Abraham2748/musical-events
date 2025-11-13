import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HomeApiResponse } from '../shared/models/home-api.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  getData() {
    return this.http.get<HomeApiResponse>(this.baseUrl + 'home');
  }
}
