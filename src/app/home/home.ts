import { Component, inject, OnInit } from '@angular/core';
import { HomeHeader } from './home-header/home-header';
import { Footer } from '../shared/components/footer/footer';
import { EventCard } from '../shared/components/event-card/event-card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { HomeApiResponse } from '../shared/models/home-api.model';
import { HomeService } from './home-service';
import { Concert } from '../shared/models/concert.model';
import { Genre } from '../shared/models/genre.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Highlightable } from '../shared/directives/highlightable';

@Component({
  selector: 'app-home',
  imports: [
    HomeHeader,
    Footer,
    EventCard,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    Highlightable,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  homeService = inject(HomeService);

  filteredConcerts: Concert[] = [];
  genres: Genre[] = [];

  initialConcerts: Concert[] = [];

  currentGenre = new FormControl(0);
  searchBarValue = '';
  searchGenreValue = 0;

  ngOnInit() {
    this.homeService.getData().subscribe((res) => {
      this.initialConcerts = res.concerts;
      this.genres = res.genres;
      this.filteredConcerts = this.initialConcerts;
    });

    this.currentGenre.valueChanges.subscribe((value: number | null) => {
      this.searchGenreValue = value || 0;
      this.filterConcerts();
    });
  }

  filterConcerts() {
    this.filterByGenre();
    this.filterByDescription();
  }

  filterByGenre() {
    if (this.searchGenreValue === 0) {
      this.filteredConcerts = this.initialConcerts;
    } else {
      this.filteredConcerts = this.initialConcerts.filter(
        (concert) => concert.genreId === this.searchGenreValue
      );
    }
  }
  filterByDescription() {
    if (this.searchBarValue === '') return;

    this.filteredConcerts = this.filteredConcerts.filter((concert) =>
      concert.description.toLowerCase().includes(this.searchBarValue.toLowerCase())
    );
  }

  searchValueChange(value: string) {
    this.searchBarValue = value;
    this.filterConcerts();
  }
}
