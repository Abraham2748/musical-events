import { Component } from '@angular/core';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EventCardComponent } from '../shared/components/event-card/event-card.component';
import { Concert } from '../shared/models/concert.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeHeaderComponent,
    FooterComponent,
    MatFormFieldModule,
    MatSelectModule,
    EventCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  concertTest: Concert = {
    id: 1,
    title: ' AC/DC Rock the world tour',
    description:
      ' AC/DC vuelve al escenario con un nuevo tour, no te lo pierdas.',
    extendedDescription:
      'AC/DC está de regreso con su electrizante Rock the World Tour, una gira que promete ser una de las más épicas en la historia del rock. Después de una pausa que parecía interminable para sus fans, la banda australiana vuelve con más energía que nunca, trayendo de vuelta todos los himnos que han definido su carrera y la historia del rock duro. Con más de 40 años sobre los escenarios, AC/DC sigue siendo una fuerza imparable, y esta gira mundial es la oportunidad perfecta para presenciar su inigualable potencia en vivo. Desde los acordes iniciales de "Back in Black" hasta los estruendosos coros de "Highway to Hell", el setlist estará lleno de clásicos inmortales que harán temblar cada rincón del estadio. La producción de este tour no dejará a nadie indiferente: pirotecnia, efectos de luces y un escenario monumental que llevará la experiencia del concierto a un nivel completamente nuevo.\n\nEste concierto no es solo un evento, es una celebración de la leyenda de AC/DC, una banda que ha roto fronteras y generaciones con su sonido único y su espíritu rebelde. Brian Johnson y Angus Young, junto con el resto de la banda, prometen ofrecer un show lleno de energía cruda, guitarras estridentes y la actitud desenfrenada que siempre los ha caracterizado. Prepárate para una noche de rock en su estado más puro, donde cada riff y cada grito te recordarán por qué AC/DC sigue siendo un referente indiscutible del género. No te pierdas esta oportunidad única de ver a una de las bandas más grandes del rock en acción, porque noches como esta son verdaderamente irrepetibles.',
    place: ' Estadio San Marcos',
    unitPrice: 175.0,
    genreId: 1,
    genre: 'Rock',
    dateEvent: '12/15/2024',
    timeEvent: '19:00',
    imageUrl:
      'http://localhost:8080/concerts/2b763a29-e54a-448f-9326-baa598350c73.jpg',
    ticketsQuantity: 85,
    finalized: false,
    status: 'Activo',
  };
}
