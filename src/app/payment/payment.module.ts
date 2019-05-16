import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { PaymentAddEditComponent } from './components/payment-add-edit/payment-add-edit.component';

@NgModule({
  declarations: [PaymentListComponent, PaymentAddEditComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MaterialDesignModule
  ]
})
export class PaymentModule { }
