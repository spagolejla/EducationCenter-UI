import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseAddeditComponent } from './components/course-addedit/course-addedit.component';
import { CourseEducatorComponent } from './components/course-educator/course-educator.component';
import { CourseManageComponent } from './components/course-manage/course-manage.component';
import { CourseclassAddComponent } from './components/courseclass-add/courseclass-add.component';



const routes: Routes = [
  {
    path: '',
    component: CourseListComponent
  },
  {
    path: 'details/:id',
    component: CourseDetailsComponent
  },
  {
    path: 'addedit/:id',
    component: CourseAddeditComponent
  },
  {
    path: 'educator',
   component: CourseEducatorComponent
  },
  {
    path: 'manage/:id',
    component: CourseManageComponent
  },
  {
    path: 'manage/addClass/:id',
    component: CourseclassAddComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class CourseRoutingModule { }
