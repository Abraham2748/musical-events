import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { NgxConfettiExplosionComponent } from 'ngx-confetti-explosion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxConfettiExplosionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  authService = inject(AuthService);

  constructor() {
    this.authService.decodeToken();
  }
}
