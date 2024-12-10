import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BuyTicketsResponse,
  GetConcertByIdResponse,
  SaleResponse,
} from '../models/concert.model';
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

  buyTickets(eventId: string, quantity: number) {
    return this.http
      .post<BuyTicketsResponse>(this.baseUrl + 'sales', {
        concertId: eventId,
        ticketsQuantity: quantity,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Error: ' + error.error.errorMessage);
          return EMPTY;
        })
      );
  }

  getSale(saleId: number) {
    return this.http
      .get<SaleResponse>(this.baseUrl + 'sales/?id=' + saleId)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Error: ' + error.error.errorMessage);
          return EMPTY;
        })
      );
  }
}
