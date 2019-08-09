import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { RateAddComponent } from './components/rate-add/rate-add.component';
import { CourseRateAddComponent } from './components/course-rate-add/course-rate-add.component';
import { AvaibleCoursesComponent } from './components/avaible-courses/avaible-courses.component';
import { StudentDataComponent } from './components/student-data/student-data.component';


const routes: Routes = [
  {
    path: '',
    component: StudentComponent
  },
  {
    path: 'details/:id',
    component: StudentDetailsComponent
  },
  {
    path: 'home',
    component: StudentHomeComponent
  },
  {
    path: 'registration',
    component: StudentRegistrationComponent
  },
  {
    path: 'rateEducator/:id',
    component: RateAddComponent
  },
  {
    path: 'rateCourse/:id',
    component: CourseRateAddComponent
  },
  {
    path: 'availableCourses',
    component: AvaibleCoursesComponent
  },
  {
    path: 'studentData',
    component: StudentDataComponent
  },
];


@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class StudentRoutingModule { }
