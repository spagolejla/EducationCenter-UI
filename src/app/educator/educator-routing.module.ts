import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducatorListComponent } from './components/educator-list/educator-list.component';
import { EducatorDetailsComponent } from './components/educator-details/educator-details.component';
import { EducatorAddeditComponent } from './components/educator-addedit/educator-addedit.component';


const routes: Routes = [
  {
    path: '',
    component: EducatorListComponent
  },
  {
    path: 'details/:id',
    component: EducatorDetailsComponent
  },
  {
    path: 'addedit/:id',
    component: EducatorAddeditComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class EducatorRoutingModule { }
