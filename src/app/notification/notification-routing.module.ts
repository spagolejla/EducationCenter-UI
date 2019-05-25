import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationManageComponent } from './components/notification-manage/notification-manage.component';



const routes: Routes = [
  {
    path: '',
    component: NotificationManageComponent
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class NotificationRoutingModule { }
