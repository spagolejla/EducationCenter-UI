import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CourseField } from "src/app/shared/models/courseField";
import { Educator } from "src/app/shared/models/educator";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { CourseService } from "../../services/course.service";
import { EducatorService } from "src/app/educator/services/educator.service";
import { forkJoin } from "rxjs";
import { AddCourse } from "src/app/shared/models/addCourse";

@Component({
  selector: "app-course-addedit",
  templateUrl: "./course-addedit.component.html",
  styleUrls: ["./course-addedit.component.scss"]
})
export class CourseAddeditComponent implements OnInit {
  errors: string[] = null;
  title = "Add new course";

  educators: Educator[] = [];
  filteredEducators: Educator[] = [];

  courseFields: CourseField[] = [];

  basicInfoFormGroup: FormGroup;
  advInfoFormGroup: FormGroup;
  specInfoFormGroup: FormGroup;

  observables: any = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private courseService: CourseService,
    private edcService: EducatorService
  ) {}

  ngOnInit() {
    this.basicInfoFormGroup = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      numberOfLectures: [null, Validators.required],
      price: [null, Validators.required]
    });
    this.advInfoFormGroup = this.fb.group({
      startDate: ["", Validators.required],
      classStartTime: ["", Validators.required],
      daysOfWeek: ["", Validators.required]
    });
    this.specInfoFormGroup = this.fb.group({
      educatorId: [{ value: null, disabled: true }, Validators.required],
      courseFieldId: [null, Validators.required]
    });

    this.observables.push(this.courseService.getCourseFields());
    this.observables.push(this.edcService.getEducators());

    forkJoin(this.observables).subscribe(responseList => {
      this.courseFields = responseList[0] as CourseField[];
      this.educators = responseList[1] as Educator[];

      this.specInfoFormGroup
        .get("courseFieldId")
        .valueChanges.subscribe(val => {
          this.toggleEducatorDropdown(val);
        });
    });
  }
  get f(): any {
    return this.specInfoFormGroup.controls;
  }

  get f1(): any {
    return this.basicInfoFormGroup.controls;
  }

  get f2(): any {
    return this.advInfoFormGroup.controls;
  }

  toggleEducatorDropdown(selectedField: number) {
    this.f.educatorId.reset();
    if (
      this.f.educatorId.status === "INVALID" ||
      this.f.educatorId.status === "DISABLED"
    ) {
      this.f.educatorId.enable();
    } else {
      this.f.educatorId.disable();
    }

    this.filteredEducators = [];
    for (let o of this.educators) {
      if (o.courseFieldId === selectedField) {
          this.filteredEducators.push(o);
      }
    }
  }
  onSubmit() {
    this.addNewCourse();
  }
  addNewCourse() {
    let d: Date = this.advInfoFormGroup.get("startDate").value;
    d.setHours(d.getHours() - d.getTimezoneOffset() / 60);

    const newCourse: AddCourse = {
      name: this.basicInfoFormGroup.value.name,
      description: this.basicInfoFormGroup.value.description,
      numberOfLectures: this.basicInfoFormGroup.value.numberOfLectures,
      price: this.basicInfoFormGroup.value.price,

      startDate: d,
      classStartTime: this.advInfoFormGroup.value.classStartTime,
      daysOfWeek: this.advInfoFormGroup.value.daysOfWeek,

      administratorId: 1, //promjeniti kad se uradi login
      educatorId: this.specInfoFormGroup.value.educatorId,
      courseFieldId: this.specInfoFormGroup.value.courseFieldId
    };

    this.courseService.addCourse(newCourse).subscribe(
      () => {
        this.openSnackBar("Success!", "New Course added!");
        this.router.navigate(["/course"]);
      },
      err => {
        console.log(err);
      }
    );
  }
  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }
}
