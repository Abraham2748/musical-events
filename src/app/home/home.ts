import { Component } from '@angular/core';
import { HomeHeader } from './home-header/home-header';
import { Footer } from '../shared/components/footer/footer';
import { EventCard } from '../shared/components/event-card/event-card';
import { Concert } from '../shared/models/concert';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  imports: [HomeHeader, Footer, EventCard, MatFormFieldModule, MatSelectModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  searchValueChange(value: string) {
    console.log('Home search value: ', value);
  }

  concertTest = {
    id: 6,
    title: 'Marc Anthony - Viviendo Tour',
    description: 'Marc Anthony regresa a Lima con su tour Viviendo, pasión y salsa en vivo.',
    extendedDescription:
      'Marc Anthony, el máximo exponente de la salsa contemporánea, vuelve a Lima con su exitoso Viviendo Tour. Con su potente voz y carisma arrollador, Marc promete una velada llena de emoción, romanticismo y sabor latino. El repertorio incluirá clásicos como “Valió la Pena”, “Vivir Mi Vida” y “Ahora Quién”, junto con sus más recientes éxitos. Acompañado por una orquesta de primer nivel, el show combina una producción impecable, luces vibrantes y una atmósfera que invita al baile y al corazón. Este concierto será una celebración de la música, la pasión y la cultura que Marc Anthony representa. Una noche inolvidable donde cada canción será un viaje a lo más profundo del alma salsera.',
    place: 'Arena Perú',
    unitPrice: 310.0,
    genreId: 2,
    genre: 'Salsa',
    dateEvent: '10/03/2026',
    timeEvent: '21:30',
    imageUrl: 'http://localhost:8080/concerts/e2dfd2fb-fb39-4189-9b37-4d2cbebe859b.jpg',
    ticketsQuantity: 175,
    finalized: false,
    status: 'Activo',
  };
}
