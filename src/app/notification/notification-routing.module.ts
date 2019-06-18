import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationManageComponent } from './components/notification-manage/notification-manage.component';
import { NotificationAddeditComponent } from './components/notification-addedit/notification-addedit.component';



const routes: Routes = [
  {
    path: '',
    component: NotificationManageComponent
  },
  {
    path: 'addedit/:id',
    component: NotificationAddeditComponent
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class NotificationRoutingModule { }
