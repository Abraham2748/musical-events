import { Component, inject, OnInit } from '@angular/core';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { EventCardComponent } from '../shared/components/event-card/event-card.component';
import { Concert } from '../shared/models/concert.model';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Genre } from '../shared/models/genre.model';
import { HomeService } from './home.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HighlightableDirective } from '../shared/directives/highlightable.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    HomeHeaderComponent,
    FooterComponent,
    EventCardComponent,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HighlightableDirective,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  concerts: Concert[] = [];
  genres: Genre[] = [];
  initialConcerts: Concert[] = [];
  homeService = inject(HomeService);
  currentGenre = new FormControl(0);
  searchGenreValue = 0;
  searchBarValue = '';

  ngOnInit(): void {
    this.homeService.getData().subscribe((response) => {
      this.initialConcerts = response.concerts;
      this.genres = response.genres;
      this.concerts = this.initialConcerts;
    });

    this.currentGenre.valueChanges.subscribe((value) => {
      this.searchGenreValue = value || 0;
      this.filterConcerts();
    });
  }

  onSearchValueChange(value: string) {
    this.searchBarValue = value;
    this.filterConcerts();
  }

  filterConcerts() {
    this.filterByGenre();
    this.filterByDescription();
  }

  filterByGenre() {
    if (this.searchGenreValue === 0) {
      this.concerts = this.initialConcerts;
    } else {
      this.concerts = this.initialConcerts.filter(
        (concert) => concert.genreId === this.searchGenreValue
      );
    }
  }
  filterByDescription() {
    if (this.searchBarValue) {
      this.concerts = this.concerts.filter((concert) =>
        concert.description
          .toLowerCase()
          .includes(this.searchBarValue.toLowerCase())
      );
    }
  }
}
