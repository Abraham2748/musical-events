import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-header',
  imports: [MatButtonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.css',
})
export class HomeHeaderComponent {
  searchBarFormControl = new FormControl();
  @Output() searchValueChange = new EventEmitter<string>();

  constructor() {
    this.searchBarFormControl.valueChanges.subscribe((value: string) => {
      this.searchValueChange.emit(value);
    });
  }
}
