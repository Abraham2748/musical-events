import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { EventCardComponent } from './event-card/event-card.component';
import { HomeService } from './home.service';
import { HomeApiResponse } from './home.model';
import { Concert } from '../shared/models/Concert.model';
import { Genre } from '../shared/models/Genre.model';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    EventCardComponent,
    FooterComponent,
    MatSelectModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  genreFormControl = new FormControl(0);

  concerts$: Observable<Concert[]> = new Observable<Concert[]>();
  genres$: Observable<Genre[]> = new Observable<Genre[]>();
  selectedConcerts$: Observable<Concert[]> = new Observable<Concert[]>();
  errorLoadingData = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    const data$ = this.homeService.getData();

    this.concerts$ = data$.pipe(map((data: HomeApiResponse) => data.concerts));

    this.genres$ = data$.pipe(
      map((data: HomeApiResponse) =>
        data.genres.filter((genre) => genre.status)
      )
    );

    this.selectedConcerts$ = this.genreFormControl.valueChanges.pipe(
      startWith(this.genreFormControl.value),
      switchMap((selectedGenreId: any) =>
        selectedGenreId === 0
          ? this.concerts$ // Return original concerts$ without filtering
          : this.concerts$.pipe(
              map((concerts: Concert[]) =>
                concerts.filter(
                  (concert) => concert.genreId === selectedGenreId
                )
              )
            )
      )
    );
  }
}
