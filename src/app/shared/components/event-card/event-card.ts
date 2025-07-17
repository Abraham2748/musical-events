import { Component, Input } from '@angular/core';
import { Concert } from '../../models/concert';

@Component({
  selector: 'app-event-card',
  imports: [],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {
  @Input({ required: true }) data!: Concert;

  onImageError() {
    this.data.imageUrl = 'images/generic-concert-poster.jpg';
  }
}
