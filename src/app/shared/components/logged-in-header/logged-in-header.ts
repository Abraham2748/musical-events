import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-logged-in-header',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './logged-in-header.html',
  styleUrl: './logged-in-header.css',
})
export class LoggedInHeader {
  authService = inject(Auth);
}
