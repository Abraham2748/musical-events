import { Component, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sale } from '../../models/concert';
import { ConcertsService } from '../../services/concerts-service';

@Component({
  selector: 'app-voucher-dialog',
  imports: [],
  templateUrl: './voucher-dialog.html',
  styleUrl: './voucher-dialog.css',
})
export class VoucherDialog implements OnInit {
  saleId = inject(MAT_DIALOG_DATA) as number;
  sale = signal<Sale | null>(null);
  concertsService = inject(ConcertsService);

  ngOnInit(): void {
    this.concertsService.getSaleById(this.saleId).subscribe((res) => {
      this.sale.set(res.data);
    });
  }
}
