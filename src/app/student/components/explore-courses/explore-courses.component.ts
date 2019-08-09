import { Component, OnInit } from '@angular/core';
import { Competition } from 'src/app/shared/models/competition';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { CompetitionService } from 'src/app/competition/services/competition.service';
@Component({
  selector: 'app-explore-courses',
  templateUrl: './explore-courses.component.html',
  styleUrls: ['./explore-courses.component.scss']
})
export class ExploreCoursesComponent implements OnInit {

  hideSpinner = false;
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCompetitions = this.listFilter ? this.applyFilter(this.listFilter) : this.competitions;
  }



  competitions: Competition[];
  filteredCompetitions: Competition[] = [];
  constructor(private compService: CompetitionService, private route: ActivatedRoute,  private _service: DataService) { }

  ngOnInit() {
    this.getCompetitions();
  }

  getCompetitions(): void {
    this.compService.getActiveCompetitions()
      .subscribe(c => {
        this.toggleSpinner();
        this.competitions = c;
        this.filteredCompetitions = this.competitions;

       
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
