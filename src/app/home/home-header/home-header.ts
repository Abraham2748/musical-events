import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Auth } from '../../shared/services/auth';

@Component({
  selector: 'app-home-header',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './home-header.html',
  styleUrl: './home-header.css',
})
export class HomeHeader {
  authService = inject(Auth);

  @Output() searchValueChange = new EventEmitter<string>();

  onInput(eventValue: Event) {
    const inputEvent = eventValue as InputEvent;
    const target = inputEvent.target as HTMLInputElement;
    const value = target.value;

    this.searchValueChange.emit(value);
  }
}
