import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { AppConfig } from 'src/app/config/config';
import { Competition } from 'src/app/shared/models/competition';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private pathAPI = this.config.setting[ 'PathAPI'] ;

  constructor(private http: HttpClient, private config: AppConfig) { }

  getCompetitions() {
    return this.http.get<Competition[]>(this.pathAPI + 'api/competitions').pipe(
      catchError(this.handleError)
    );
  }

  getCompetitionById(id: number) {
    return this.http.get<Competition>(this.pathAPI + `api/competition/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getCompetitionsByEducatorId(id: number) {
    return this.http.get<Competition[]>(this.pathAPI + `api/educator/competitions/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getActiveCompetitionsByEducatorId(id: number) {
    return this.http.get<Competition[]>(this.pathAPI + `api/educator/active/competitions/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getCompetitionsByStudentId(id: number) {
    return this.http.get<Competition[]>(this.pathAPI + `api/student/competitions/${id}`).pipe(
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
