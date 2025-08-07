import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HomeApiResponse } from '../models/home-api.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeApi {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  getData() {
    return this.http.get<HomeApiResponse>(this.baseUrl + 'home');
  }
}
