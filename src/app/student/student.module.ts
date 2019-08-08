import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentComponent } from './components/student/student.component';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { RateAddComponent } from './components/rate-add/rate-add.component';
import { CourseRateAddComponent } from './components/course-rate-add/course-rate-add.component';



@NgModule({
  declarations: [StudentComponent, StudentDetailsComponent, StudentHomeComponent, StudentRegistrationComponent, RateAddComponent, CourseRateAddComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
