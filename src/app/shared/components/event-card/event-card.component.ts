import { Component, Input } from '@angular/core';
import { Concert } from '../../models/concert.model';
@Component({
    selector: 'app-event-card',
    imports: [],
    templateUrl: './event-card.component.html',
    styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input({ required: true }) data!: Concert;

  OnImageError() {
    this.data.imageUrl = 'images/generic-concert-poster.jpg';
  }
}
