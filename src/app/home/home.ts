import { Component } from '@angular/core';
import { HomeHeader } from './home-header/home-header';

@Component({
  selector: 'app-home',
  imports: [HomeHeader],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
