import { Component, OnInit } from '@angular/core';
import { Competition } from 'src/app/shared/models/competition';
import { CompetitionService } from '../../services/competition.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-competition-active-list',
  templateUrl: './competition-active-list.component.html',
  styleUrls: ['./competition-active-list.component.scss']
})
export class CompetitionActiveListComponent implements OnInit {

  hideSpinner = false;
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCompetitions = this.listFilter ? this.applyFilter(this.listFilter) : this.competitions;
  }
  competitionsExist: boolean = false;

  educatorId: number;
  competitions: Competition[];
  filteredCompetitions: Competition[] = [];
  constructor(private compService: CompetitionService, private route: ActivatedRoute,  private _service: DataService) { }

  ngOnInit() {
    this.educatorId = this._service.currentUser.userId;
    this.getCompetition();
  }

  getCompetition(): void {
    this.compService.getActiveCompetitionsByEducatorId(this.educatorId)
      .subscribe(c => {
        this.toggleSpinner();
        this.competitions = c;
        this.filteredCompetitions = this.competitions;
        if(this.competitions.length > 0)
        {
          this.competitionsExist = true;
        }
        console.log(this.competitions);
      }
      );
  }

  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.toLocaleLowerCase();
    let result1: Competition[];
    result1 = this.competitions.filter((competition: Competition) =>
    competition.courseName.toLocaleLowerCase().indexOf(filterValue) !== -1);

    return result1;
  }

}
