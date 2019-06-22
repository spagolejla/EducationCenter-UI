import { Injectable } from '@angular/core';
import { Administrator } from 'src/app/shared/models/administrator';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from 'src/app/config/config';
import { throwError } from 'rxjs';
import { AddAdmin } from 'src/app/shared/models/addAdministrator';
import { EditAdmin } from 'src/app/shared/models/editAdmin';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  private pathAPI = this.config.setting[ 'PathAPI'] ;

  constructor(private http: HttpClient, private config: AppConfig) { }

  getAdministrators(){
    return this.http.get<Administrator[]>(this.pathAPI + 'api/administrators').pipe(
      catchError(this.handleError)
    );
  }

  getAdminById(id: number) {
    return this.http.get<EditAdmin>(this.pathAPI + `api/administrator/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addAdmin(adm: AddAdmin) {
    return this.http.post<AddAdmin>(this.pathAPI + 'api/administrator', adm).pipe(
     catchError(this.handleError)
    );
  }

  updateAdmin(adm: EditAdmin) {
    return this.http.put<EditAdmin>(this.pathAPI + 'api/administrator', adm).pipe(
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
