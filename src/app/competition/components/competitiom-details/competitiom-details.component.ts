import { Component, OnInit, ViewChild } from "@angular/core";
import { Competition } from "src/app/shared/models/competition";
import { CompetitionService } from "../../services/competition.service";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CompetitionApplication } from "src/app/shared/models/competitionApplication";
import { DataService } from "src/app/shared/services/data.service";
import * as moment from "moment";
import { CourseService } from 'src/app/course/services/course.service';
import { MatSnackBar } from '@angular/material';
import { Educator } from 'src/app/shared/models/educator';
import { EducatorService } from 'src/app/educator/services/educator.service';

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
  selectedStudents: CompetitionApplication[] = [];

  observables: any = [];
  competitionFinished: boolean = false;
  isSorted: boolean = false;
  isActive: boolean = false;
  isApplied: boolean = false;

  constructor(
    private compService: CompetitionService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private _service: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
    private educatorService: EducatorService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.competitionId = +params.get("id");
    });

    this.observables.push(
      this.compService.getCompetitionById(this.competitionId)

    );



    forkJoin(this.observables).subscribe(responseList => {
      this.competition = responseList[0] as Competition;

      this.sortedData = this.competition.applications.slice();
      if (this._service.isStudent) {
        this.checkIsApplied();
      }
      if (this.competition.active === false) {
        this.sortData1();
      }
      let now = moment();
      let comDate = moment(this.competition.endDate);
      if (now > comDate) {
        this.competitionFinished = true;
      }

      this.toggleSpinner();
    });
  }

checkIsApplied() {
  this.competition.applications.forEach((app) => {
         if (app.studentId === this._service.currentUser.userId) {
           this.isApplied = true;
         }
  });

  }

  sortData(sort: Sort) {
    const data = this.competition.applications.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === "desc";
      switch (sort.active) {
        case "points":
          return compare(a.points, b.points, isAsc);

        default:
          return 0;
      }
    });
  }

  sortData1() {
    const data = this.competition.applications.slice();
    this.isSorted = true;
    this.sortedData = data.sort((a, b) => {
      return compare(a.points, b.points, false);
    });


    for (let i = 0; i < this.competition.maxCandidatesNumber; i++) {
      this.selectedStudents.push(this.sortedData[i]);
    }


  }

  toggleSpinner() {
    this.hideSpinner ? (this.hideSpinner = false) : (this.hideSpinner = true);
  }

  addToCourse() {
this.competition.active = false;
this.compService.deactivateCompetition(this.competition);
this.courseService.addStudentsToCourse(this.selectedStudents).subscribe(
  () => {
    this.toggleSpinner();
    this.openSnackBar("Success!", "Students  added to course!");
    this.router.navigate(["/course/educator"]);
  },
  err => {
    this.toggleSpinner();
    this.snackBar.open(err, "Close");
    console.error(err);
  }
);

  }

  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }
}

function compare(
  a: number | string | Date,
  b: number | string | Date,
  isAsc: boolean
) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
