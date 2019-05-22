import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorListComponent } from './components/administrator-list/administrator-list.component';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';

@NgModule({
  declarations: [AdministratorListComponent],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    MaterialDesignModule
  ]
})
export class AdministratorModule { }
