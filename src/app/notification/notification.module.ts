import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationRoutingModule } from './notification-routing.module';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationAddeditComponent } from './components/notification-addedit/notification-addedit.component';
import { NotificationManageComponent } from './components/notification-manage/notification-manage.component';

@NgModule({
  declarations: [NotificationListComponent, NotificationAddeditComponent, NotificationManageComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    NotificationListComponent
  ]
})
export class NotificationModule { }
