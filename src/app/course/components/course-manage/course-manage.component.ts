import { Component, OnInit } from '@angular/core';
import { CourseManage } from 'src/app/shared/models/courseManage';
import { Educator } from 'src/app/shared/models/educator';
import { Student } from 'src/app/shared/models/student';
import { EducatorService } from 'src/app/educator/services/educator.service';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import {Location} from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-course-manage',
  templateUrl: './course-manage.component.html',
  styleUrls: ['./course-manage.component.scss']
})
export class CourseManageComponent implements OnInit {

  hideSpinner = false;
  course: CourseManage;
  courseId: number;
  classesNumber: number;
  helperNumber: number;
  isChanged: boolean = false;
  students: Student[];

  observables: any = [];

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private _service: DataService,
    private _location: Location,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = +params.get("id");
    });

    this.observables.push(
      this.courseService.getCourseManageById(this.courseId));

    forkJoin(this.observables).subscribe(responseList => {
      this.course = responseList[0] as CourseManage;
      this.classesNumber = this.course.currentNumberOfClasses;
      this.toggleSpinner();
      console.log(this.course);
    });
  }

  decrementNumberOfClasses(): number {
    if (this.classesNumber === this.course.currentNumberOfClasses && this.isChanged === false) {
      this.helperNumber = this.classesNumber;
      this.isChanged = true;
      return this.helperNumber--;
    } else {
      return this.helperNumber--;
    }


  }

  addClass(){
    //[routerLink]="['/course/manage/addClass', course.id]"

    if(this.course.currentNumberOfClasses >= this.course.maxNumberOfClasses ){
      this.openSnackBar(`Error! Max number of classes is ${this.course.maxNumberOfClasses}!`,"Close");
      return;
    } else {
      this.router.navigate(['/course/manage/addClass', this.courseId]);
    }
  }
  onBack() {
    this._location.back();
  }
  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }

  openSnackBar(message: string, description: string): void {
    this.snackBar.open(message, description, {
      duration: 1000
    });
  }
}
