import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { HomeHeaderService } from './home-header.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home-header',
  imports: [MatButtonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.css',
})
export class HomeHeaderComponent {
  searchBarFormControl = new FormControl();
  homeHeaderService = inject(HomeHeaderService);
  authService = inject(AuthService);

  constructor() {
    this.homeHeaderService.searchValue$ =
      this.searchBarFormControl.valueChanges;
  }
}
