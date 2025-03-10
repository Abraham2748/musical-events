import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Options, SimpleNotificationsModule } from 'angular2-notifications';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SimpleNotificationsModule, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  authService = inject(AuthService);
  title = 'musical-events';
  notificationsOptions: Options = {
    position: ['top', 'right'],
    timeOut: 3000,
  };
  constructor() {
    this.authService.decodeToken();
  }
}
