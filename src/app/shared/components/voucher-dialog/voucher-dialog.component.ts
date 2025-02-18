import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sale } from '../../models/concert.model';
import { ConcertsService } from '../../services/concerts.service';

@Component({
  selector: 'app-voucher-dialog',
  imports: [],
  templateUrl: './voucher-dialog.component.html',
  styleUrl: './voucher-dialog.component.css',
})
export class VoucherDialogComponent {
  data = inject(MAT_DIALOG_DATA) as { saleId: number };
  sale!: Sale;
  concertsService = inject(ConcertsService);

  constructor() {
    this.concertsService.getSaleById(this.data.saleId).subscribe((response) => {
      this.sale = response.data;
    });
  }
}
