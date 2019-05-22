import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, filter } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { AppConfig } from 'src/app/config/config';
import { Educator } from 'src/app/shared/models/educator';

@Injectable({
  providedIn: 'root'
})
export class EducatorService {

  private pathAPI = this.config.setting[ 'PathAPI'] ;

  constructor(private http: HttpClient, private config: AppConfig) { }


getEducators(){
  return this.http.get<Educator[]>(this.pathAPI + 'api/educators').pipe(
    catchError(this.handleError)
  );
}



getEducatorById(id: number) {
  return this.http.get<Educator>(this.pathAPI + `api/educator/${id}`).pipe(
    retry(3),
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
