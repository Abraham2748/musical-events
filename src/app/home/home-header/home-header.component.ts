import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { HomeHeaderService } from './home-header.service';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.css',
})
export class HomeHeaderComponent {
  searchBarFormControl = new FormControl();
  homeHeaderService = inject(HomeHeaderService);

  constructor() {
    this.homeHeaderService.searchValue$ =
      this.searchBarFormControl.valueChanges;
  }
}
