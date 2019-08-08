import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { DataService } from "src/app/shared/services/data.service";
import { Course } from "src/app/shared/models/course";
import { CourseService } from "src/app/course/services/course.service";
import { forkJoin } from "rxjs";
import { AddCourseRate } from "src/app/shared/models/addCourseRate";
@Component({
  selector: "app-course-rate-add",
  templateUrl: "./course-rate-add.component.html",
  styleUrls: ["./course-rate-add.component.scss"]
})
export class CourseRateAddComponent implements OnInit {
  rateForm: FormGroup;
  hideSpinner = false;
  course: Course;
  courseId: number;
  observables: any = [];
  isRatedAlready: boolean;
  constructor(
    private courseService: CourseService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private _service: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = +params.get("id");
    });

    this.observables.push(this.courseService.getCourseById(this.courseId));

    forkJoin(this.observables).subscribe(responseList => {
      this.course = responseList[0] as Course;
      let student =
        this._service.currentUser.firstName +
        " " +
        this._service.currentUser.lastName;
      for (let i = 0; i < this.course.rates.length; i++) {
        if (this.course.rates[i].student === student) {
          this.openSnackBar("Error!", "You had already rated this course!");
          this.router.navigate(["/course/details", this.courseId]);
        }
      }
      this.toggleSpinner();
    });

    this.rateForm = this.formBuilder.group({
      comment: ["", Validators.required],
      rate: ["", [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  get f() {
    return this.rateForm.controls;
  }

  onSubmit() {
    const newRate: AddCourseRate = {
      courseId: this.courseId,
      studentId: this._service.currentUser.userId,
      rate: this.rateForm.value.rate,
      comment: this.rateForm.value.comment
    };

    this.courseService.addCourseRate(newRate).subscribe(
      () => {
        this.toggleSpinner();
        this.openSnackBar("Success!", "Course is successfully rated!");
        this.router.navigate(["/course/details", this.courseId]);
      },
      err => {
        this.toggleSpinner();
        this.openSnackBar(err, "Something bad has happened!");
        console.log(err);
      }
    );
  }

  toggleSpinner() {
    this.hideSpinner ? (this.hideSpinner = false) : (this.hideSpinner = true);
  }
  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }
}
