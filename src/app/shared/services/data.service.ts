import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, filter } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';
import { AppConfig } from 'src/app/config/config';
import { User } from '../models/user';
import { AuthService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public currentUser: User;
  isLoggedIn$: boolean;
  public isAdmin:boolean;
  public isEducator:boolean;
  public isStudent:boolean;

  constructor(private authService: AuthService){}

  initUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(this.currentUser){
      this.authService.logged=true;
      this.isLoggedIn$=true;
    }
    else{
      this.authService.logged=false;
      this.isLoggedIn$=false;
    }

    this.isAdmin=false;
    this.isEducator=false;
    this.isStudent=false;
    if (this.currentUser != null) {
      if (this.currentUser.accountType === "Administrator") {
        this.isAdmin = true;
      } else if (this.currentUser.accountType === "Educator") {
        this.isEducator = true;
      } else {
        this.isStudent = true;
      }
    }
  }

}
