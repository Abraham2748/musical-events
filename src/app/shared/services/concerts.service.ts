import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BuyTicketsResponse,
  GetConcertByIdResponse,
  GetSaleByIdResponse,
} from '../models/concert.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConcertsService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  getConcertById(id: string) {
    return this.http.get<GetConcertByIdResponse>(
      this.baseUrl + 'concerts/' + id
    );
  }

  buyTickets(eventId: string, quantity: number) {
    return this.http.post<BuyTicketsResponse>(this.baseUrl + 'sales', {
      concertId: eventId,
      ticketsQuantity: quantity,
    });
  }

  getSaleById(saleId: number) {
    return this.http.get<GetSaleByIdResponse>(
      this.baseUrl + 'sales/?id=' + saleId
    );
  }
}
