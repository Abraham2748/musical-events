import { Component, inject, OnInit } from '@angular/core';
import { LoggedInHeaderComponent } from '../shared/components/logged-in-header/logged-in-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { EventCardComponent } from '../shared/components/event-card/event-card.component';
import { MatButtonModule } from '@angular/material/button';
import { Concert } from '../shared/models/concert.model';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConcertsService } from '../shared/services/concerts.service';

@Component({
  selector: 'app-event-detail',
  imports: [
    LoggedInHeaderComponent,
    FooterComponent,
    EventCardComponent,
    MatButtonModule,
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css',
})
export class EventDetailComponent implements OnInit {
  concert!: Concert;
  authService = inject(AuthService);
  router = inject(Router);
  matDialog = inject(MatDialog);
  eventId = '';
  activatedRoute = inject(ActivatedRoute);
  concertsService = inject(ConcertsService);

  ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.params['id'];
    this.concertsService.getConcertById(this.eventId).subscribe((response) => {
      this.concert = response.data;
    });
  }

  openBuyDialog() {
    if (!this.authService.getIsLoggedIn()) {
      alert('Debes iniciar sesión para comprar');
      this.router.navigate(['/login']);
    }

    if (this.authService.getRole() === 'Administrator') {
      alert('Los administradores no pueden comprar boletos');
      return;
    }
  }
}
