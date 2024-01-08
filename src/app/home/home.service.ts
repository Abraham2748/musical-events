import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../shared/services/Config.service';
import { HomeApiResponse } from './home.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = this.configService.getBaseUrl() + 'home';

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getData(): Observable<HomeApiResponse> {
    return this.http
      .get<HomeApiResponse>(this.apiUrl, {
        headers: this.configService.getHeaders(),
      })
      .pipe(
        catchError((error: any) => {
          console.error('Error occurred:', error);
          throw new Error('Something went wrong in the request.');
        })
      );
  }
}
