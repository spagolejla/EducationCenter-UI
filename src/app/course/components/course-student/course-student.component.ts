import { Component, OnInit } from '@angular/core';
import { Course } from "src/app/shared/models/course";
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material";
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-student',
  templateUrl: './course-student.component.html',
  styleUrls: ['./course-student.component.scss']
})
export class CourseStudentComponent implements OnInit {

  hideSpinner = false;
  courses: Course[];
  activeCourses: Course[];
  studentId: number;
  displayedColumns: string[] = [
    "Title",
    "Active",
    "Action"
  ];
  displayedColumns2: string[] = [
    "Title",
    "Action"
  ];
  dataSource;
  dataSource2;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private _service: DataService
  ) {}

  ngOnInit() {
    this.studentId = this._service.currentUser.userId;
    this.getCourses();
     this.getActiveCourses();
  }
  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }
// getActiveCoursesByEducatorId
  getCourses(): void {
    this.courseService.getCoursesByStudentId( this.studentId ).subscribe(course => {
      this.toggleSpinner();
      this.courses = course;
      this.dataSource = new MatTableDataSource(this.courses);


      console.log(this.courses);
    });
  }

   getActiveCourses(): void {
    this.courseService.getActiveCoursesByStudentId( this.studentId ).subscribe(course => {
      this.toggleSpinner();
      this.activeCourses = course;

      this.dataSource2 = new MatTableDataSource(this.activeCourses);

      console.log(this.activeCourses);
    });
  }

}
