import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorListComponent } from './components/administrator-list/administrator-list.component';
import { AdminAddeditComponent } from './components/admin-addedit/admin-addedit.component';

const routes: Routes = [
  {
    path: '',
    component: AdministratorListComponent
  },
  {
    path: 'addedit/:id',
    component: AdminAddeditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class AdministratorRoutingModule { }
