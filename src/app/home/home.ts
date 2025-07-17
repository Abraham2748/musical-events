import { Component } from '@angular/core';
import { HomeHeader } from './home-header/home-header';
import { Footer } from '../shared/components/footer/footer';
import { EventCard } from '../shared/components/event-card/event-card';
import { Concert } from '../shared/models/concert';

@Component({
  selector: 'app-home',
  imports: [HomeHeader, Footer, EventCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  conciertoDePrueba: Concert = {
    id: 1,
    title: 'AC/DC - Power Up Tour',
    description:
      'AC/DC enciende Lima con su gira Power Up Tour, una noche de puro rock.',
    extendedDescription:
      'AC/DC, una de las bandas más legendarias del rock, se presenta con su esperada gira Power Up Tour para ofrecer un espectáculo electrizante. Con una trayectoria de décadas y éxitos atemporales como “Back in Black”, “Thunderstruck” y “Highway to Hell”, la banda promete una noche cargada de energía, guitarras potentes y una puesta en escena sin igual. Brian Johnson, Angus Young y compañía harán vibrar al público con su característico sonido explosivo, riffs inolvidables y una presencia escénica arrolladora. Este concierto es una cita obligada para los amantes del rock clásico, con una producción que incluye luces impactantes, pantallas gigantes y una experiencia sonora envolvente. Prepárate para saltar, cantar y vivir la intensidad de AC/DC en un evento que quedará grabado en la memoria de todos los asistentes.',
    place: 'Estadio San Marcos',
    unitPrice: 210.0,
    genreId: 1,
    genre: 'Rock',
    dateEvent: '10/21/2026',
    timeEvent: '20:30',
    imageUrl:
      'http://localhost:8080/concerts/af4f45af-8279-460c-9091-6298d3bef9fe.jpg',
    ticketsQuantity: 140,
    finalized: false,
    status: 'Activo',
  };
}
