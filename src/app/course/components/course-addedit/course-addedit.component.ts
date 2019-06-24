import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CourseField } from "src/app/shared/models/courseField";
import { Educator } from "src/app/shared/models/educator";
import { MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { CourseService } from "../../services/course.service";
import { EducatorService } from "src/app/educator/services/educator.service";
import { forkJoin } from "rxjs";
import { AddCourse } from "src/app/shared/models/addCourse";
import { EditCourse } from 'src/app/shared/models/editCourse';

@Component({
  selector: "app-course-addedit",
  templateUrl: "./course-addedit.component.html",
  styleUrls: ["./course-addedit.component.scss"]
})
export class CourseAddeditComponent implements OnInit {
  errors: string[] = null;
  title = "Add new course";

  isEdit: boolean = false;

  educators: Educator[] = [];
  filteredEducators: Educator[] = [];

  courseFields: CourseField[] = [];

  courseEdit: EditCourse;

  basicInfoFormGroup: FormGroup;
  advInfoFormGroup: FormGroup;
  specInfoFormGroup: FormGroup;

  observables: any = [];
  courseId: number;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private courseService: CourseService,
    private edcService: EducatorService,
    private route: ActivatedRoute

  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.courseId = +params.get("id");
    });


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
    if(this.courseId !== 0){
      this.observables.push(this.courseService.getCourseById(this.courseId));
      this.isEdit = true;
    }

    forkJoin(this.observables).subscribe(responseList => {
      this.courseFields = responseList[0] as CourseField[];
      this.educators = responseList[1] as Educator[];
      if(this.courseId !== 0){
       this.courseEdit = responseList[2] as EditCourse;
       this.displayCourse();
      }
      this.specInfoFormGroup
        .get("courseFieldId")
        .valueChanges.subscribe(val => {
          this.toggleEducatorDropdown(val);
        });
    });
  }
  displayCourse() {
    this.title = "Edit course";

    this.basicInfoFormGroup.patchValue({
      name: this.courseEdit.name,
      description: this.courseEdit.description,
      numberOfLectures: this.courseEdit.numberOfLectures,
      price:this.courseEdit.price
    });

    this.advInfoFormGroup.patchValue({
      startDate: this.courseEdit.startDate,
      classStartTime:this.courseEdit.classStartTime,
      daysOfWeek:this.courseEdit.daysOfWeek,
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
    if(this.isEdit){
      this.updateCourse();
    } else {
    this.addNewCourse();
    }
  }

  updateCourse() {
    this.courseEdit.name = this.basicInfoFormGroup.value.name;
    this.courseEdit.description = this.basicInfoFormGroup.value.description;
    this.courseEdit.numberOfLectures = this.basicInfoFormGroup.value.numberOfLectures;
    this.courseEdit.price = this.basicInfoFormGroup.value.price;
    this.courseEdit.startDate = this.advInfoFormGroup.value.startDate;
    this.courseEdit.classStartTime = this.advInfoFormGroup.value.classStartTime;
    this.courseEdit.daysOfWeek = this.advInfoFormGroup.value.daysOfWeek;


    this.courseService.updateCourse(this.courseEdit).subscribe(
     () => {
       this.snackBar.open('Successfully updated couers !', 'Close', {
         duration: 3000
       });
       this.router.navigate(['/course/details',this.courseId]);
     },
     err => {
       this.snackBar.open(err, 'Close');
       console.error(err);
     }
   );

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
