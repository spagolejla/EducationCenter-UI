import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducatorListComponent } from './components/educator-list/educator-list.component';
import { EducatorDetailsComponent } from './components/educator-details/educator-details.component';


const routes: Routes = [
  {
    path: '',
    component: EducatorListComponent
  },
  {
    path: 'details/:id',
    component: EducatorDetailsComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class EducatorRoutingModule { }
