import { Component } from '@angular/core';
import { LoggedInHeader } from '../shared/components/logged-in-header/logged-in-header';
import { Footer } from '../shared/components/footer/footer';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [LoggedInHeader, Footer, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {}
