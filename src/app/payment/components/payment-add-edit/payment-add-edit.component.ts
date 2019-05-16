import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-add-edit',
  templateUrl: './payment-add-edit.component.html',
  styleUrls: ['./payment-add-edit.component.scss']
})
export class PaymentAddEditComponent implements OnInit {

  pageTitle = 'Edit payment';
  paymentId: number;

  constructor( private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe(
      params => {
        this.paymentId = + params.get('id');
        this.getPayment();
      });


  }

  getPayment(): void {
    if (this.paymentId === 0) {
      this.pageTitle = 'Add Payment';
    } else {
      this.pageTitle = `Edit Payment`;
    }
  }
}
