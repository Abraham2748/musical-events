import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { HomeHeader } from './home-header/home-header';
import { Footer } from '../shared/components/footer/footer';
import { EventCard } from '../shared/components/event-card/event-card';
import { Concert } from '../shared/models/concert';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Genre } from '../shared/models/genre';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HomeApi } from '../shared/services/home-api';
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
  concerts: WritableSignal<Concert[]> = signal([]);
  genres: WritableSignal<Genre[]> = signal([]);

  initialConcerts: Concert[] = [];

  currentGenre = new FormControl(0);
  searchBarValue = '';
  searchGenreValue = 0;

  homeService = inject(HomeApi);

  ngOnInit() {
    this.homeService.getData().subscribe((response) => {
      this.initialConcerts = response.concerts;
      this.genres.set(response.genres);
      this.concerts.set(this.initialConcerts);
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
      this.concerts.set(this.initialConcerts);
    } else {
      this.concerts.set(
        this.initialConcerts.filter(
          (concert) => concert.genreId === this.searchGenreValue
        )
      );
    }
  }

  filterByDescription() {
    if (!this.searchBarValue) return;

    this.concerts.set(
      this.concerts().filter((concert) =>
        concert.description
          .toLowerCase()
          .includes(this.searchBarValue.toLowerCase())
      )
    );
  }

  onSearchBarValueChange(value: string) {
    this.searchBarValue = value;
    this.filterConcerts();
  }
}
