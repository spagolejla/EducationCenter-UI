import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducatorListComponent } from './components/educator-list/educator-list.component';
import { EducatorDetailsComponent } from './components/educator-details/educator-details.component';
import { EducatorAddeditComponent } from './components/educator-addedit/educator-addedit.component';
import { EducatorEditComponent } from './components/educator-edit/educator-edit.component';
import { EducatorHomeComponent } from './components/educator-home/educator-home.component';


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
  {
    path: 'edit/:id',
    component: EducatorEditComponent
  },
  {
    path: 'home',
    component: EducatorHomeComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class EducatorRoutingModule { }
