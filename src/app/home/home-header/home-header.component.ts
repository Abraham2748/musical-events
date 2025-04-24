import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-header',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.css',
})
export class HomeHeaderComponent {
  @Output() searchValueChange = new EventEmitter<string>();

  onInput(searchValue: Event) {
    const inputEvent = searchValue as InputEvent;
    const target = inputEvent.target as HTMLInputElement;
    this.searchValueChange.emit(target.value);
  }
}
