import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorListComponent } from './components/administrator-list/administrator-list.component';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { AdminAddeditComponent } from './components/admin-addedit/admin-addedit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdministratorListComponent, AdminAddeditComponent],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdministratorModule { }
