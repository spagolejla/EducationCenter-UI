import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionRoutingModule } from './competition-routing.module';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompetitionListComponent } from './components/competition-list/competition-list.component';
import { CompetitionComponent } from './components/competition/competition.component';
import { CompetitionActiveListComponent } from './components/competition-active-list/competition-active-list.component';
import { CompetitiomDetailsComponent } from './components/competitiom-details/competitiom-details.component';
import { CompetitionAddeditComponent } from './components/competition-addedit/competition-addedit.component';

@NgModule({
  declarations: [CompetitionListComponent, CompetitionComponent, CompetitionActiveListComponent, CompetitiomDetailsComponent, CompetitionAddeditComponent],
  imports: [
    CommonModule,
    CompetitionRoutingModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CompetitionListComponent,
    CompetitionActiveListComponent
  ]
})
export class CompetitionModule { }
