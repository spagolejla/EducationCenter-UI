import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { AppConfig } from 'src/app/config/config';
import { Course } from 'src/app/shared/models/course';


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

  getCoursesByEducatorId(id: number) {
    return this.http.get<Course[]>(this.pathAPI + `api/educator/${id}/courses`).pipe(
      catchError(this.handleError)
    );
  }

  getCoursesByStudentId(id: number) {
    return this.http.get<Course[]>(this.pathAPI + `api/student/${id}/courses`).pipe(
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
