import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorListComponent } from './components/administrator-list/administrator-list.component';
import { AdminAddeditComponent } from './components/admin-addedit/admin-addedit.component';
import { AdminGuard } from '../shared/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AdministratorListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'addedit/:id',
    component: AdminAddeditComponent,
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class AdministratorRoutingModule { }
