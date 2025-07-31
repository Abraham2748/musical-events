import { Component } from '@angular/core';
import { LoggedInHeader } from '../shared/components/logged-in-header/logged-in-header';

@Component({
  selector: 'app-event-detail',
  imports: [LoggedInHeader],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail {}
