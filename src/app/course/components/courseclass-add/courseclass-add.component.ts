import { Component, OnInit } from '@angular/core';
import { Educator } from 'src/app/shared/models/educator';
import { Student } from 'src/app/shared/models/student';
import { EducatorService } from 'src/app/educator/services/educator.service';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import {Location} from '@angular/common';
import { CourseManage } from 'src/app/shared/models/courseManage';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AddCourseClass } from 'src/app/shared/models/addCourseClass';
@Component({
  selector: 'app-courseclass-add',
  templateUrl: './courseclass-add.component.html',
  styleUrls: ['./courseclass-add.component.scss']
})
export class CourseclassAddComponent implements OnInit {
  hideSpinner = false;
  course: CourseManage;
  courseId: number;
  observables: any = [];
  selectedStudentsIds: number[] = [];
  studentCompleted: boolean = false;
  classForm = this.fb.group({
    addstudents: [],
    description:['', Validators.required]
  });
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private _service: DataService,
    private _location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = +params.get("id");
    });

    this.observables.push(
      this.courseService.getCourseManageById(this.courseId));

    forkJoin(this.observables).subscribe(responseList => {
      this.course = responseList[0] as CourseManage;

    });
  }
  onRemoveUser(id: number): void {
    this.selectedStudentsIds = this.selectedStudentsIds.filter( value => {
      return value !== id;
    });

    if (this.selectedStudentsIds.length === 0) {
     this.studentCompleted = false;
    }
  }
  studentSelected(id: number): void {
    if (this.selectedStudentsIds.includes(id)) {
      this.onRemoveUser(id);
    } else {
      this.onAddUser(id);
    }
  }

  onAddUser(id: number): void {
    this.selectedStudentsIds.push(id);

    this.studentCompleted = true;
  }
  onSubmit(){
    const courseClass: AddCourseClass = {
        description: this.classForm.value.description,
        courseId: this.course.id,
        studentIds: this.selectedStudentsIds
    };

    this.courseService.addCourseClass(courseClass).subscribe(
      () => {
        this.openSnackBar('Success!', 'New Class added!');
        this.router.navigate(['/course/manage', this.courseId]);
      },
      err => console.log(err)
    );

  }
  onBack() {
    this._location.back();
  }
  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }
  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 10000
    });
  }
}
