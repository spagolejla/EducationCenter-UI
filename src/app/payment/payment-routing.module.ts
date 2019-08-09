import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentAddEditComponent } from './components/payment-add-edit/payment-add-edit.component';
import { PaymentAddeditGuard } from './guards/payment-addedit.guard';
import { AdminGuard } from '../shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: PaymentListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'addedit/:id',
    component: PaymentAddEditComponent,
    canDeactivate: [PaymentAddeditGuard],
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class PaymentRoutingModule { }
