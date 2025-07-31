import { Component, inject, OnInit } from '@angular/core';
import { LoggedInHeader } from '../shared/components/logged-in-header/logged-in-header';
import { Footer } from '../shared/components/footer/footer';
import { EventCard } from '../shared/components/event-card/event-card';
import { MatButtonModule } from '@angular/material/button';
import { Concert } from '../shared/models/concert';
import { Auth } from '../shared/services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConcertsService } from '../shared/services/concerts-service';
import { BuyDialog } from './buy-dialog/buy-dialog';
import { VoucherDialog } from '../shared/components/voucher-dialog/voucher-dialog';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-event-detail',
  imports: [LoggedInHeader, Footer, EventCard, MatButtonModule],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.css',
})
export class EventDetail implements OnInit {
  concert!: Concert;

  authService = inject(Auth);
  router = inject(Router);
  matDialog = inject(MatDialog);

  eventId = '';
  activatedRoute = inject(ActivatedRoute);
  concertService = inject(ConcertsService);

  ngOnInit(): void {
    this.eventId = this.activatedRoute.snapshot.params['id'];
    this.concertService.getConcertById(this.eventId).subscribe((res) => {
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
      disableClose: true,
    });

    buyDialogRef.afterClosed().subscribe((saleId: number) => {
      if (!saleId) return;

      confetti({
        zIndex: 1001,
      });

      const voucherDialogRef = this.matDialog.open(VoucherDialog, {
        data: saleId,
      });

      voucherDialogRef.afterClosed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });
  }
}
