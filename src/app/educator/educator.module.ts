import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducatorListComponent } from './components/educator-list/educator-list.component';
import { EducatorRoutingModule } from './educator-routing.module';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EducatorDetailsComponent } from './components/educator-details/educator-details.component';
import { EducatorAddeditComponent } from './components/educator-addedit/educator-addedit.component';
import { EducatorEditComponent } from './components/educator-edit/educator-edit.component';
import { EducatorHomeComponent } from './components/educator-home/educator-home.component';
import { NotificationModule } from '../notification/notification.module';
import { CompetitionModule } from '../competition/competition.module';



@NgModule({
  declarations: [EducatorListComponent, EducatorDetailsComponent, EducatorAddeditComponent, EducatorEditComponent, EducatorHomeComponent],
  imports: [
    CommonModule,
    EducatorRoutingModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    NotificationModule,
    CompetitionModule
  ]
})
export class EducatorModule { }
