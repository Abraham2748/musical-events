import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from './shared/services/auth';
import { Options, SimpleNotificationsModule } from 'angular2-notifications';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SimpleNotificationsModule, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  authService = inject(Auth);

  notificationsOptions: Options = {
    position: ['top', 'right'],
    timeOut: 3000,
  };

  constructor() {
    this.authService.decodeToken();
  }
}
