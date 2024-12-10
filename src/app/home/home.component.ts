import { Component, inject, OnInit } from '@angular/core';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EventCardComponent } from '../shared/components/event-card/event-card.component';
import { Concert } from '../shared/models/concert.model';
import { HttpClient } from '@angular/common/http';
import { HomeApiResponse } from './home.model';
import { NgFor, NgIf } from '@angular/common';
import { HomeService } from './home.service';
import { Genre } from '../shared/models/genre.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HomeHeaderService } from './home-header/home-header.service';
import { HighlightableDirective } from '../shared/directives/highlightable.directive';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [
        HomeHeaderComponent,
        FooterComponent,
        MatFormFieldModule,
        MatSelectModule,
        EventCardComponent,
        ReactiveFormsModule,
        HighlightableDirective,
        RouterLink,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  concerts: Concert[] = [];
  genres: Genre[] = [];

  initialConcerts: Concert[] = [];

  homeService = inject(HomeService);
  homeHeaderService = inject(HomeHeaderService);

  currentGenre = new FormControl(0);

  searchGenreValue = 0;
  searchBarValue = '';

  ngOnInit() {
    this.homeService.getData().subscribe((response) => {
      this.initialConcerts = response.concerts;
      this.genres = response.genres;
      this.concerts = this.initialConcerts;
    });

    this.currentGenre.valueChanges.subscribe((value) => {
      this.searchGenreValue = value || 0;
      this.filterConcerts();
    });

    this.homeHeaderService.searchValue$.subscribe((value) => {
      this.searchBarValue = value;
      this.filterConcerts();
    });
  }

  filterConcerts() {
    this.concerts =
      this.searchGenreValue === 0
        ? this.initialConcerts
        : this.initialConcerts.filter(
            (concert) => concert.genreId === this.searchGenreValue
          );

    this.concerts = this.concerts.filter((concert) =>
      concert.description
        .toLowerCase()
        .includes(this.searchBarValue.toLowerCase())
    );
  }
}
