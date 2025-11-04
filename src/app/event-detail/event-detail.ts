import { Component } from '@angular/core';
import { LoggedInHeader } from '../shared/components/logged-in-header/logged-in-header';
import { Footer } from '../shared/components/footer/footer';
import { EventCard } from '../shared/components/event-card/event-card';
import { MatButtonModule } from '@angular/material/button';
import { Concert } from '../shared/models/concert.model';

@Component({
  selector: 'app-event-detail',
  imports: [LoggedInHeader, Footer, EventCard, MatButtonModule],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail {
  openBuyDialog() {}

  testConcert: Concert = {
    id: 4,
    title: 'Metallica - M72 World Tour',
    description: 'Metallica llega con el M72 Tour, una descarga de metal inolvidable.',
    extendedDescription:
      'Metallica, una de las bandas más influyentes del heavy metal, aterriza en Lima con su poderosa gira M72 World Tour. Con una carrera legendaria y una legión de fans en todo el mundo, James Hetfield, Lars Ulrich, Kirk Hammett y Robert Trujillo ofrecerán una noche brutal con temas como “Enter Sandman”, “Master of Puppets” y “One”. Este concierto contará con una producción colosal, sonido envolvente en 360 grados y una experiencia escénica que llevará al público por un viaje sonoro y visual impactante. Metallica no solo promete un concierto, sino un evento épico que quedará marcado en la historia del metal en Perú. Prepárate para una noche intensa, llena de riffs aplastantes y pura adrenalina.',
    place: 'Estadio Nacional',
    unitPrice: 350.0,
    genreId: 1,
    genre: 'Rock',
    dateEvent: '12/05/2026',
    timeEvent: '20:00',
    imageUrl: 'http://localhost:8080/concerts/6a9c4e17-741b-47eb-a66c-04f8747638d4.jpg',
    ticketsQuantity: 220,
    finalized: false,
    status: 'Activo',
  };
}
