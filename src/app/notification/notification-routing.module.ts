import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationManageComponent } from './components/notification-manage/notification-manage.component';
import { NotificationAddeditComponent } from './components/notification-addedit/notification-addedit.component';
import { LoggedInGuard } from '../shared/guards/logged-in.guard';
import { AdmEdcGuard } from '../shared/guards/adm-edc.guard';



const routes: Routes = [
  {
    path: '',
    component: NotificationManageComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'addedit/:id',
    component: NotificationAddeditComponent,
    canActivate: [AdmEdcGuard]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class NotificationRoutingModule { }
