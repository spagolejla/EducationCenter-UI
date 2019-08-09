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
import { LoggedInGuard } from '../shared/guards/logged-in.guard';
import { StudentGuard } from '../shared/guards/student.guard';


const routes: Routes = [ 
  {
    path: '',
    component: StudentComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'details/:id',
    component: StudentDetailsComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'home',
    component: StudentHomeComponent,
    canActivate: [StudentGuard]
  },
  {
    path: 'registration',
    component: StudentRegistrationComponent
  },
  {
    path: 'rateEducator/:id',
    component: RateAddComponent,
    canActivate: [StudentGuard]
  },
  {
    path: 'rateCourse/:id',
    component: CourseRateAddComponent,
    canActivate: [StudentGuard]
  },
  {
    path: 'availableCourses',
    component: AvaibleCoursesComponent,
    canActivate: [StudentGuard]
  },
  {
    path: 'studentData',
    component: StudentDataComponent,
    canActivate: [StudentGuard]
  },
];


@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class StudentRoutingModule { }
