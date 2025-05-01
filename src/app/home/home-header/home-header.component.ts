import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home-header',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.css',
})
export class HomeHeaderComponent {
  authService = inject(AuthService);
  @Output() searchValueChange = new EventEmitter<string>();

  onInput(searchValue: Event) {
    const inputEvent = searchValue as InputEvent;
    const target = inputEvent.target as HTMLInputElement;
    this.searchValueChange.emit(target.value);
  }
}
