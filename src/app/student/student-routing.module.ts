import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent
  },
  {
    path: 'details/:id',
    component: StudentDetailsComponent
  },
];


@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class StudentRoutingModule { }
