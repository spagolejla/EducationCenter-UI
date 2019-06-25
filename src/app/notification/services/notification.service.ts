import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from 'src/app/config/config';
import { Notification } from 'src/app/shared/models/notification';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AddNotification } from 'src/app/shared/models/addNotification';
import { EditNotification } from 'src/app/shared/models/editNotification';


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

  addNotif(notif: AddNotification) {
    return this.http.post<AddNotification>(this.pathAPI + 'api/notification', notif).pipe(
     catchError(this.handleError)
    );
 }

 updateNotif(notif: EditNotification) {
  return this.http.put<EditNotification>(this.pathAPI + 'api/notification', notif).pipe(
   catchError(this.handleError)
  );
}

 getNotifById(id: number): Observable<EditNotification> {
  return this.http.get<EditNotification>(this.pathAPI + `api/notification/${id}`);
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
