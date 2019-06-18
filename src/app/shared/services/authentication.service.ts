import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';
import { tokenNotExpired } from 'angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private currentUserSubject: BehaviorSubject<User>;
  //public currentUser: Observable<User>;

 /*  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;

  auth0 = new auth0.WebAuth({
    clientID: 'Ini8WtdKRRQtLj3nyucYQYz5RRoM6uYU',
    domain: 'educationcenter.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/home',
    scope: 'openid'
  }); */


/*   constructor( private http: HttpClient ) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

   } */


   //public get currentUserValue(): User {
    //return this.currentUserSubject.value;}

 /*    constructor(public router: Router) {
      this._idToken = '';
      this._accessToken = '';
      this._expiresAt = 0;
    }

    get accessToken(): string {
      return this._accessToken;
    }

    get idToken(): string {
      return this._idToken;
    }

    public login(): void {
      this.auth0.authorize();
    } */

/* login(username: string, password: string) {
  return this.http.post<any>(`http://localhost:44329/api/auth/login`, { username, password })
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
          }

          return user;
      }));
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
} */

/* lock = new Auth0Lock(
  'Ini8WtdKRRQtLj3nyucYQYz5RRoM6uYU',
  'educationcenter.eu.auth0.com'
);

constructor() {
  this.lock.on('authenticated',(authResult) =>{
    console.log('authResult', authResult)
    localStorage.setItem('token', authResult.idToken);
  });
}

public login(){
  this.lock.show();
}

public authenticated(){
  return tokenNotExpired('token');
}

public logout(){
  localStorage.removeItem('token');
}
 */

 private currentUserSubject: BehaviorSubject<User>;
 public currentUser: Observable<User>;

constructor( private http: HttpClient ) {

  this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  this.currentUser = this.currentUserSubject.asObservable();

 }

 login(username: string, password: string) {
  return this.http.post<any>(`http://localhost:44329/api/auth/login`, { username, password })
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
          }

          return user;
      }));
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}

getLoggedInUser() {

  return this.currentUser;
}

}
