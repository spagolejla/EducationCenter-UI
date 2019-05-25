import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from 'src/app/config/config';
import { Notification } from 'src/app/shared/models/notification';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private pathAPI = this.config.setting['PathAPI'] ;
  constructor(private http: HttpClient, private config: AppConfig) { }

  getNotifications() {
    return this.http.get<Notification[]>(this.pathAPI + 'api/notifications').pipe(
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
