import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GetConcertByIdResponse } from '../models/concert.model';
import { catchError, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConcertsService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  getConcertById(id: string) {
    return this.http
      .get<GetConcertByIdResponse>(this.baseUrl + 'concerts/' + id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Error: ' + error.error.errorMessage);
          return EMPTY;
        })
      );
  }
}
