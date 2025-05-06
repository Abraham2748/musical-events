import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConcertsService } from '../../services/concerts.service';
import { Sale } from '../../models/concert.model';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-voucher-dialog',
  imports: [],
  templateUrl: './voucher-dialog.component.html',
  styleUrl: './voucher-dialog.component.css',
})
export class VoucherDialogComponent implements OnInit {
  saleId = inject(MAT_DIALOG_DATA) as number;
  sale!: Sale;
  concertsService = inject(ConcertsService);

  ngOnInit(): void {
    this.concertsService
      .getSaleById(this.saleId)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('error: ', err);
          alert(err.error.errorMessage);
          return of();
        })
      )
      .subscribe((res) => {
        this.sale = res.data;
      });
  }
}
