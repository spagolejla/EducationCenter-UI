import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentAddEditComponent } from './components/payment-add-edit/payment-add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentListComponent
  },
  {
    path: 'addedit/:id',
    component: PaymentAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class PaymentRoutingModule { }
