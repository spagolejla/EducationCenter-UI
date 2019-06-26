import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  hideSpinner = false;
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCourses = this.listFilter ? this.applyFilter(this.listFilter) : this.courses;
  }

  courses: Course[];
  filteredCourses: Course[] = [];
  constructor(private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCourses();
  }
  toggleSpinner() {
    this.hideSpinner ? this.hideSpinner = false : this.hideSpinner = true;
  }
  getCourses(): void {
    this.courseService.getCourses()
      .subscribe(c => {
        this.toggleSpinner();
        this.courses = c;
        this.filteredCourses = this.courses;
        console.log(this.courses);
      }
      );
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.toLocaleLowerCase();
    let result1: Course[];
    result1 = this.courses.filter((course: Course) =>
    course.name.toLocaleLowerCase().indexOf(filterValue) !== -1);

    return result1;
  }
}
