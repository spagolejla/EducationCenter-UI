import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { CourseRoutingModule } from './course-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseAddeditComponent } from './components/course-addedit/course-addedit.component';
import { CourseEducatorComponent } from './components/course-educator/course-educator.component';
import { CourseManageComponent } from './components/course-manage/course-manage.component';
import { CourseclassAddComponent } from './components/courseclass-add/courseclass-add.component';
import { CourseStudentComponent } from './components/course-student/course-student.component';

@NgModule({
  declarations: [CourseListComponent, CourseDetailsComponent, CourseAddeditComponent, CourseEducatorComponent, CourseManageComponent, CourseclassAddComponent, CourseStudentComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CourseModule { }
