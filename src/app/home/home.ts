import { Component } from '@angular/core';
import { HomeHeader } from './home-header/home-header';
import { Footer } from '../shared/components/footer/footer';
import { EventCard } from '../shared/components/event-card/event-card';
import { Concert } from '../shared/models/concert';

@Component({
  selector: 'app-home',
  imports: [HomeHeader, Footer, EventCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  searchValueChange(value: string) {
    console.log('Home search value: ', value);
  }
}
