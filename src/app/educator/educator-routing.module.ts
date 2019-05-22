import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducatorListComponent } from './components/educator-list/educator-list.component';


const routes: Routes = [
  {
    path: '',
    component: EducatorListComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class EducatorRoutingModule { }
