import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { CourseRoutingModule } from './course-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseAddeditComponent } from './components/course-addedit/course-addedit.component';
import { CourseEducatorComponent } from './components/course-educator/course-educator.component';

@NgModule({
  declarations: [CourseListComponent, CourseDetailsComponent, CourseAddeditComponent, CourseEducatorComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CourseModule { }
