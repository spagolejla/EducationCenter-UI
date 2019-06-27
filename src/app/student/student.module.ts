import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';

import { StudentComponent } from './components/student/student.component';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';



@NgModule({
  declarations: [StudentComponent, StudentDetailsComponent, StudentHomeComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MaterialDesignModule
  ]
})
export class StudentModule { }
