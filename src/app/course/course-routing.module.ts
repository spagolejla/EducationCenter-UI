import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseAddeditComponent } from './components/course-addedit/course-addedit.component';
import { CourseEducatorComponent } from './components/course-educator/course-educator.component';
import { CourseManageComponent } from './components/course-manage/course-manage.component';
import { CourseclassAddComponent } from './components/courseclass-add/courseclass-add.component';
import { CourseStudentComponent } from './components/course-student/course-student.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { LoggedInGuard } from '../shared/guards/logged-in.guard';
import { EducatorGuard } from '../shared/guards/educator.guard';
import { StudentGuard } from '../shared/guards/student.guard';



const routes: Routes = [
  {
    path: '',
    component: CourseListComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'details/:id',
    component: CourseDetailsComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'addedit/:id',
    component: CourseAddeditComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'educator',
   component: CourseEducatorComponent,
   canActivate: [EducatorGuard]
  },
  {
    path: 'student',
   component: CourseStudentComponent,
   canActivate: [StudentGuard]
  },
  {
    path: 'manage/:id',
    component: CourseManageComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'manage/addClass/:id',
    component: CourseclassAddComponent,
    canActivate: [EducatorGuard]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class CourseRoutingModule { }
