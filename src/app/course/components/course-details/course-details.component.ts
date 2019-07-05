import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { Educator } from 'src/app/shared/models/educator';
import { Student } from 'src/app/shared/models/student';
import { EducatorService } from 'src/app/educator/services/educator.service';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  hideSpinner = false;
  course: Course;
  courseId: number;

  students: Student[];

  observables: any = [];

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private _service: DataService
    ) { }

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        this.courseId = +params.get("id");
      });

      this.observables.push(
        this.courseService.getCourseById(this.courseId));



      forkJoin(this.observables).subscribe(responseList => {
        this.course = responseList[0] as Course;
        this.toggleSpinner();
        console.log(this.course);
      });
    }

    toggleSpinner() {
      this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
    }
}
