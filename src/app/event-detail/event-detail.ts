import { Component, inject, OnInit } from '@angular/core';
import { LoggedInHeader } from '../shared/components/logged-in-header/logged-in-header';
import { Footer } from '../shared/components/footer/footer';
import { EventCard } from '../shared/components/event-card/event-card';
import { MatButtonModule } from '@angular/material/button';
import { Concert } from '../shared/models/concert.model';
import { Auth } from '../shared/services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConcertsService } from '../shared/services/concerts-service';
import { BuyDialog } from './buy-dialog/buy-dialog';
import { VoucherDialog } from '../shared/components/voucher-dialog/voucher-dialog';

@Component({
  selector: 'app-event-detail',
  imports: [LoggedInHeader, Footer, EventCard, MatButtonModule],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail implements OnInit {
  concert: Concert | null = null;

  authService = inject(Auth);
  router = inject(Router);
  matDialog = inject(MatDialog);

  eventId = '';

  activatedRoute = inject(ActivatedRoute);
  concertsService = inject(ConcertsService);

  ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.params['id'];
    this.concertsService.getConcertById(this.eventId).subscribe((res) => {
      this.concert = res.data;
    });
  }

  openBuyDialog() {
    if (!this.authService.getIsLoggedIn()) {
      alert('Debes iniciar sesión para comprar');
      this.router.navigateByUrl('/login');
      return;
    }

    if (this.authService.getRole() === 'Administrator') {
      alert('Los administradores no pueden comprar boletos');
      return;
    }

    const buyDialogRef = this.matDialog.open(BuyDialog, {
      data: this.concert,
    });

    buyDialogRef.afterClosed().subscribe((res) => {
      if (!res) return;

      const voucherDialogRef = this.matDialog.open(VoucherDialog, {
        data: res,
      });

      voucherDialogRef.afterClosed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });
  }
}
