import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logged-in-header',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './logged-in-header.html',
  styleUrl: './logged-in-header.css',
})
export class LoggedInHeader {
  authService = inject(Auth);
}
