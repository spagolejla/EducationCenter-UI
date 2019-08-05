import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { Student } from 'src/app/shared/models/student';
import { AppConfig } from 'src/app/config/config';
import { StudentRegistration } from 'src/app/shared/models/studentRegistration';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private pathAPI = this.config.setting[ 'PathAPI'] ;

  constructor(private http: HttpClient, private config: AppConfig) { }

  getStudents() {
    return this.http.get<Student[]>(this.pathAPI + 'api/students').pipe(
      catchError(this.handleError)
    );
  }


  getStudentById(id: number) {
    return this.http.get<Student>(this.pathAPI + `api/student/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  addStudent(std: StudentRegistration) {
    return this.http.post<StudentRegistration>(this.pathAPI + 'api/student', std).pipe(
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
