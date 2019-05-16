import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/shared/models/payment';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {

  payments: Payment[];
  displayedColumns: string[] = ['Student', 'Course', 'Date', 'Amount',  'Action'];
  dataSource;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) { }

  ngOnInit() {
    this.getPayments();
  }

  getPayments(): void {
    this.paymentService.getPayments()
      .subscribe(payment => {
        this.payments = payment;
        this.dataSource = new MatTableDataSource(this.payments);
        console.log(this.payments);
      }
      );
  }

  getTotal() {
    return this.payments.map(p => p.amount).reduce(( acc, value ) => acc + value, 0);
  }

}
