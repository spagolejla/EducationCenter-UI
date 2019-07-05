import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionListComponent } from './components/competition-list/competition-list.component';
import { CompetitionComponent } from './components/competition/competition.component';
import { CompetitiomDetailsComponent } from './components/competitiom-details/competitiom-details.component';


const routes: Routes = [
  {
    path: '',
    component: CompetitionComponent
  },
  {
    path: 'details/:id',
    component: CompetitiomDetailsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class CompetitionRoutingModule { }
