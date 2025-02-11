import { Component } from '@angular/core';
import { HomeHeaderComponent } from './home-header/home-header.component';

@Component({
  selector: 'app-home',
  imports: [HomeHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  onSearchValueChange(value: string) {
    console.log('new value: ', value);
  }
}
