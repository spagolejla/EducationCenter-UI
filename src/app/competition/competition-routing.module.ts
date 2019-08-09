import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionListComponent } from './components/competition-list/competition-list.component';
import { CompetitionComponent } from './components/competition/competition.component';
import { CompetitiomDetailsComponent } from './components/competitiom-details/competitiom-details.component';
import { CompetitionAddeditComponent } from './components/competition-addedit/competition-addedit.component';
import { EducatorGuard } from '../shared/guards/educator.guard';
import { LoggedInGuard } from '../shared/guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: CompetitionComponent,
    canActivate: [EducatorGuard]
  },
  {
    path: 'details/:id',
    component: CompetitiomDetailsComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'addedit/:id',
    component: CompetitionAddeditComponent,
    canActivate: [EducatorGuard]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class CompetitionRoutingModule { }
