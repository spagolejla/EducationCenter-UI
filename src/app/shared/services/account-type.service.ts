import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, filter } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { AppConfig } from 'src/app/config/config';
import { AccountType } from '../models/accountType';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {

  private pathAPI = this.config.setting[ 'PathAPI'] ;

  constructor(private http: HttpClient, private config: AppConfig) { }


  getAccountTypes(){
    return this.http.get<AccountType[]>(this.pathAPI + 'api/accountTypes').pipe(
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
