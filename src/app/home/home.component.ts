import { Component } from '@angular/core';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { EventCardComponent } from '../shared/components/event-card/event-card.component';
import { Concert } from '../shared/models/concert.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  imports: [
    HomeHeaderComponent,
    FooterComponent,
    EventCardComponent,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  concertTest: Concert = {
    id: 5,
    title: ' Héctor Lavoe: El Cantante de los Cantantes',
    description:
      ' Un homenaje a la leyenda de la salsa, Héctor Lavoe, en una noche inolvidable.',
    extendedDescription:
      ' El legado de Héctor Lavoe, El Cantante de los Cantantes, se revive en un espectacular concierto homenaje que promete una velada inolvidable llena de ritmo, sabor y emoción. Con una orquesta en vivo que interpreta los grandes éxitos de Lavoe como “Periódico de Ayer”, “El Cantante” y “Mi Gente”, los asistentes se sumergirán en el alma y la pasión de la salsa pura. Esta noche estará dedicada a rendir tributo a una de las voces más icónicas de la música latina, cuyo impacto cultural sigue vigente en todo el mundo. El concierto estará acompañado de visuales que cuentan la historia de su carrera, desde su ascenso a la fama con la Fania All-Stars hasta su legado como el intérprete de salsa más influyente de todos los tiempos. La energía del público se sentirá en cada rincón, con fanáticos de todas las generaciones uniéndose para celebrar la vida y música de un verdadero ícono. Si eres amante de la salsa, este evento será una experiencia única, donde el espíritu de Héctor Lavoe vivirá a través de cada nota y cada canción.',
    place: ' Gran Teatro Nacional',
    unitPrice: 180.0,
    genreId: 2,
    genre: 'Salsa',
    dateEvent: '12/01/2025',
    timeEvent: '20:00',
    imageUrl:
      'http://localhost:8080/concerts/f21f119c-f02f-41e2-8d20-74dfecde7fc6.jpg',
    ticketsQuantity: 110,
    finalized: false,
    status: 'Activo',
  };
}
