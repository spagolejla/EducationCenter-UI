import { Injectable } from "@angular/core";
import { User } from "../models/user";

import { AppConfig } from 'src/app/config/config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  currentUser: any;
  redirectUrl: string;

  private headerOpened$ = new BehaviorSubject<boolean>(false);
  private loggedIn = new BehaviorSubject<boolean>(false);
  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  // get isLoggedIn(): boolean {
  //   return !!this.currentUser;
  // }

  private pathAPI = this.config.setting['PathAPI'];
  constructor(private http: HttpClient, private config: AppConfig, private router: Router){

  }

  onHeaderToggle(): Observable<boolean> {
    return this.headerOpened$.asObservable();
  }


  headerToggle() {
    this.headerOpened$.next(!this.headerOpened$.value);
  }
  getCurrentUser() {
   return this.currentUser;
  }

  getCurrentUser2(): Observable<User> {
    return this.currentUser.asObservable();
   }

  login1(username: string, password: string): Observable<User> {
    this.loggedIn.next(true);
    return this.http.get<User>(this.pathAPI + `api/userAccount/login/${username}/${password}`);
  }



  logout(): void {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
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
