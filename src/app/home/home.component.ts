import { Component, inject, OnInit } from '@angular/core';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { EventCardComponent } from '../shared/components/event-card/event-card.component';
import { Concert } from '../shared/models/concert.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Genre } from '../shared/models/genre.model';
import { HomeService } from '../shared/services/home.service';
import { HighlightableDirective } from '../shared/directives/highlightable.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    HomeHeaderComponent,
    FooterComponent,
    EventCardComponent,
    MatFormFieldModule,
    MatSelectModule,
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
  currentGenre = new FormControl(0);
  searchGenreValue = 0;
  searchBarValue = '';

  homeService = inject(HomeService);

  ngOnInit(): void {
    this.homeService.getData().subscribe((res) => {
      this.initialConcerts = res.concerts;
      this.genres = res.genres;
      this.concerts = this.initialConcerts;
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
      this.concerts = this.initialConcerts;
    } else {
      this.concerts = this.initialConcerts.filter(
        (concert) => concert.genreId === this.searchGenreValue
      );
    }
  }
  filterByDescription() {
    if (!this.searchBarValue) return;

    this.concerts = this.concerts.filter((concert) =>
      concert.description
        .toLowerCase()
        .includes(this.searchBarValue.toLowerCase())
    );
  }

  onSearchBarValueChange(value: string) {
    this.searchBarValue = value;
    this.filterConcerts();
  }
}
