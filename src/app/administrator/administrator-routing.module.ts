import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorListComponent } from './components/administrator-list/administrator-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdministratorListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class AdministratorRoutingModule { }
