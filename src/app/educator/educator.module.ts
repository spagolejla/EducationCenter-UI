import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducatorListComponent } from './components/educator-list/educator-list.component';
import { EducatorRoutingModule } from './educator-routing.module';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EducatorListComponent],
  imports: [
    CommonModule,
    EducatorRoutingModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EducatorModule { }
