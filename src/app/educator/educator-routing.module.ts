import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducatorListComponent } from './components/educator-list/educator-list.component';
import { EducatorDetailsComponent } from './components/educator-details/educator-details.component';
import { EducatorAddeditComponent } from './components/educator-addedit/educator-addedit.component';
import { EducatorEditComponent } from './components/educator-edit/educator-edit.component';
import { EducatorHomeComponent } from './components/educator-home/educator-home.component';
import { LoggedInGuard } from '../shared/guards/logged-in.guard';
import { AdminGuard } from '../shared/guards/admin.guard';
import { EducatorGuard } from '../shared/guards/educator.guard';


const routes: Routes = [
  {
    path: '',
    component: EducatorListComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'details/:id',
    component: EducatorDetailsComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'addedit/:id',
    component: EducatorAddeditComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'edit/:id',
    component: EducatorEditComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'home',
    component: EducatorHomeComponent,
    canActivate: [EducatorGuard]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class EducatorRoutingModule { }
