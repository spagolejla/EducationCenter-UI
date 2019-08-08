import { Component, OnInit } from "@angular/core";
import { EducatorService } from "../../services/educator.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Educator } from "src/app/shared/models/educator";
import { Course } from "src/app/shared/models/course";
import { CourseService } from "src/app/course/services/course.service";
import { forkJoin } from 'rxjs';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: "app-educator-details",
  templateUrl: "./educator-details.component.html",
  styleUrls: ["./educator-details.component.scss"]
})
export class EducatorDetailsComponent implements OnInit {
  hideSpinner = false;

  educator: Educator;
  educatorId: number;
  courses: Course[];
  observables: any = [];

  displayedColumns: string[] = [ 'Student', 'Comment', 'Rate'];
  dataSource;

  constructor(
    private educatorService: EducatorService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private _service: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.educatorId = +params.get("id");
    });

    this.observables.push(
      this.educatorService.getEducatorById(this.educatorId));
    this.observables.push(this.courseService.getCoursesByEducatorId(this.educatorId));


    forkJoin(this.observables).subscribe(responseList => {
      this.educator = responseList[0] as Educator;
      console.log('Educator', this.educator);
      this.dataSource = new MatTableDataSource(this.educator.rates);
      this.courses = responseList[1] as Course[];
      console.log(this.courses);
      this.toggleSpinner();
    }

    );
  }

  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }
  rateEducator() {
    //[routerLink]="['/student/rateEducator', educator.id]"
       const std = this._service.currentUser.firstName + ' ' + this._service.currentUser.lastName;
    for ( let i = 0 ; i < this.educator.rates.length; i++){
         if ( this.educator.rates[i].student === std) {
          this.snackBar.open("Error! You had already rated this educator!", "Close", {
            duration: 3000
          });
          return;
         }
    }

    this.router.navigate(["/student/rateEducator", this.educatorId]);

  }
}
