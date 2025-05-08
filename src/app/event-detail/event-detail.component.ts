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
import { BuyDialogComponent } from './buy-dialog/buy-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { VoucherDialogComponent } from '../shared/components/voucher-dialog/voucher-dialog.component';
import confetti from 'canvas-confetti';
import { NotificationsService } from 'angular2-notifications';

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
  activatedRouter = inject(ActivatedRoute);
  concertsService = inject(ConcertsService);
  notifications = inject(NotificationsService);

  ngOnInit() {
    this.eventId = this.activatedRouter.snapshot.params['id'];
    this.concertsService.getConcertById(this.eventId).subscribe((res) => {
      this.concert = res.data;
    });
  }

  openBuyDialog() {
    if (!this.authService.getIsLoggedIn()) {
      this.notifications.warn('Cuidado', 'Debes iniciar sesión para comprar');
      this.router.navigateByUrl('/login');
      return;
    }

    if (this.authService.getRole() === 'Administrator') {
      this.notifications.warn(
        'Cuidado',
        'Los administradores no pueden comprar boletos'
      );
      return;
    }

    const buyDialogRef = this.matDialog.open(BuyDialogComponent, {
      data: this.concert,
      disableClose: true,
    });

    buyDialogRef.afterClosed().subscribe((res) => {
      if (!res) return;
      this.notifications.success('Compra exitosa');
      confetti({
        zIndex: 1001,
      });
      const voucherDialogRef = this.matDialog.open(VoucherDialogComponent, {
        data: res,
      });

      voucherDialogRef.afterClosed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });
  }
}
