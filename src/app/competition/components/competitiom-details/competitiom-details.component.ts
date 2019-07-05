import { Component, OnInit, ViewChild } from "@angular/core";
import { Competition } from "src/app/shared/models/competition";
import { CompetitionService } from "../../services/competition.service";
import { ActivatedRoute } from "@angular/router";
import { forkJoin } from 'rxjs';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CompetitionApplication } from 'src/app/shared/models/competitionApplication';
import { DataService } from 'src/app/shared/services/data.service';



@Component({
  selector: "app-competitiom-details",
  templateUrl: "./competitiom-details.component.html",
  styleUrls: ["./competitiom-details.component.scss"]
})
export class CompetitiomDetailsComponent implements OnInit {
  hideSpinner = false;
  competition: Competition;
  competitionId: number;
  sortedData: CompetitionApplication[];

  observables: any = [];

 // displayedColumns: string[] = ['name', 'calories', 'fat', 'carbs'];
 // dataSource = new MatTableDataSource(this.desserts);






  constructor(
    private compService: CompetitionService,
    private route: ActivatedRoute,
    private _service: DataService
  ) {

  }



  ngOnInit() {


    this.route.paramMap.subscribe(params => {
      this.competitionId = +params.get("id");
    });

    this.observables.push(
      this.compService.getCompetitionById(this.competitionId));


    forkJoin(this.observables).subscribe(responseList => {
      this.competition = responseList[0] as Competition;
      this.sortedData = this.competition.applications.slice();
      console.log('competition', this.competition);
      this.toggleSpinner();
    });
  }

  sortData(sort: Sort) {
    const data = this.competition.applications.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'student': return compare(a.student, b.student, isAsc);
        case 'date': return compare(a.date, b.date, isAsc);
        default: return 0;
      }
    });
  }




  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
