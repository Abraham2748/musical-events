import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SalesApiResponse } from './sales.model';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  getSales(dateStart: Date, dateEnd: Date, page = 1, recordsPerPage = 999) {
    //format dates to mm-dd-yyyy
    const dateStartFormatted = `${(dateStart.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dateStart
      .getDate()
      .toString()
      .padStart(2, '0')}-${dateStart.getFullYear()}`;

    const dateEndFormatted = `${(dateEnd.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dateEnd
      .getDate()
      .toString()
      .padStart(2, '0')}-${dateEnd.getFullYear()}`;

    const apiUrl = new URL(this.baseUrl + 'sales/ListSalesByDate');
    apiUrl.searchParams.append('DateStart', dateStartFormatted);
    apiUrl.searchParams.append('DateEnd', dateEndFormatted);
    apiUrl.searchParams.append('Page', page.toString());
    apiUrl.searchParams.append('RecordsPerPage', recordsPerPage.toString());

    return this.http.get<SalesApiResponse>(apiUrl.toString());
  }
}
