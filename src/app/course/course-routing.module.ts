import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseAddeditComponent } from './components/course-addedit/course-addedit.component';
import { CourseEducatorComponent } from './components/course-educator/course-educator.component';



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
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class CourseRoutingModule { }
