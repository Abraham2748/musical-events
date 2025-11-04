import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetConcertByIdResponse } from '../models/concert.model';

@Injectable({
  providedIn: 'root',
})
export class ConcertsService {
  private baseUrl = 'http://localhost:8080/api/';
  private http = inject(HttpClient);

  getConcertById(id: string) {
    return this.http.get<GetConcertByIdResponse>(this.baseUrl + 'concerts/' + id);
  }
}
