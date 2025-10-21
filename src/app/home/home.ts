import { Component } from '@angular/core';
import { HomeHeader } from './home-header/home-header';
import { Footer } from '../shared/components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [HomeHeader, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  searchValueChange(value: string) {
    console.log('Home search value: ', value);
  }
}
