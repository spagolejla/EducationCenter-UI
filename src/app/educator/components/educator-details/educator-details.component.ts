import { Component, OnInit } from "@angular/core";
import { EducatorService } from "../../services/educator.service";
import { ActivatedRoute } from "@angular/router";
import { Educator } from "src/app/shared/models/educator";
import { Course } from "src/app/shared/models/course";
import { CourseService } from "src/app/course/services/course.service";
import { forkJoin } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

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
    private route: ActivatedRoute
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

}
