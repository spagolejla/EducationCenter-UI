import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';


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
];


@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class StudentRoutingModule { }
