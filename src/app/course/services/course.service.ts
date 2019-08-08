import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { AppConfig } from 'src/app/config/config';
import { Course } from 'src/app/shared/models/course';
import { CourseField } from 'src/app/shared/models/courseField';
import { AddCourse } from 'src/app/shared/models/addCourse';
import { EditCourse } from 'src/app/shared/models/editCourse';
import { CompetitionApplication } from 'src/app/shared/models/competitionApplication';
import { CourseManage } from 'src/app/shared/models/courseManage';
import { AddCourseClass } from 'src/app/shared/models/addCourseClass';
import { AddCourseRate } from 'src/app/shared/models/addCourseRate';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private pathAPI = this.config.setting[ 'PathAPI'] ;

  constructor(private http: HttpClient, private config: AppConfig) { }

  getCourses() {
    return this.http.get<Course[]>(this.pathAPI + 'api/courses').pipe(
      catchError(this.handleError)
    );
  }

  getCourseFields() {
    return this.http.get<CourseField[]>(this.pathAPI + 'api/courseFields').pipe(
      catchError(this.handleError)
    );
  }

  getCourseById(id: number) {
    return this.http.get<Course[]>(this.pathAPI + `api/course/${id}`).pipe(
      catchError(this.handleError)
    );
  }

 getCourseManageById(id: number) {
    return this.http.get<CourseManage[]>(this.pathAPI + `api/course/manage/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  getCoursesByEducatorId(id: number) {
    return this.http.get<Course[]>(this.pathAPI + `api/educator/${id}/courses`).pipe(
      catchError(this.handleError)
    );
  }

  getCoursesForCompetition(id: number) {
    return this.http.get<Course[]>(this.pathAPI + `api/educator/${id}/courses/forCompetition`).pipe(
      catchError(this.handleError)
    );
  }

  getActiveCoursesByEducatorId(id: number) {
    return this.http.get<Course[]>(this.pathAPI + `api/educator/${id}/courses/active`).pipe(
      catchError(this.handleError)
    );
  }

  getCoursesByStudentId(id: number) {
    return this.http.get<Course[]>(this.pathAPI + `api/student/${id}/courses`).pipe(
      catchError(this.handleError)
    );
  }

  getActiveCoursesByStudentId(id: number) {
    return this.http.get<Course[]>(this.pathAPI + `api/student/${id}/courses/active`).pipe(
      catchError(this.handleError)
    );
  }

  addCourse(course: AddCourse) {
    return this.http.post<AddCourse>(this.pathAPI + 'api/course', course).pipe(
     catchError(this.handleError)
    );
 }

 addCourseClass(courseClass: AddCourseClass) {
  return this.http.post<AddCourseClass>(this.pathAPI + 'api/course/addClass', courseClass).pipe(
   catchError(this.handleError)
  );
}

 addStudentsToCourse(students: CompetitionApplication[]) {
  return this.http.post<CompetitionApplication[]>(this.pathAPI + 'api/course/addStudents', students).pipe(
   catchError(this.handleError)
  );
}

 updateCourse(course: EditCourse) {
  return this.http.put<EditCourse>(this.pathAPI + 'api/course', course).pipe(
   catchError(this.handleError)
  );
}
addCourseRate(rate: AddCourseRate) {
  return this.http.post<AddCourseRate>(this.pathAPI + 'api/course/addRate', rate).pipe(
   catchError(this.handleError)
  );
}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }


}
