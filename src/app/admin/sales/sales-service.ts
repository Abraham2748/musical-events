import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { to2digit } from '../../shared/adapters/custom-date-adapter';
import { ListSalesByDateApiResponse } from './sales.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  listSalesByDate(dateStart: Date, dateEnd: Date) {
    const dateStartFormatted =
      to2digit(dateStart.getMonth() + 1) +
      '-' +
      to2digit(dateStart.getDate()) +
      '-' +
      dateStart.getFullYear();
    const dateEndFormatted =
      to2digit(dateEnd.getMonth() + 1) +
      '-' +
      to2digit(dateEnd.getDate()) +
      '-' +
      dateEnd.getFullYear();

    const apiUrl = new URL(this.baseUrl + 'sales/ListSalesByDate');
    apiUrl.searchParams.append('DateStart', dateStartFormatted);
    apiUrl.searchParams.append('DateEnd', dateEndFormatted);
    apiUrl.searchParams.append('Page', '1');
    apiUrl.searchParams.append('RecordsPerPage', '999');

    return this.http.get<ListSalesByDateApiResponse>(apiUrl.toString());
  }
}
