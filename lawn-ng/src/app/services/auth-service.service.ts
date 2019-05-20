import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, config } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Config } from '../shared/config';
import { Router } from '@angular/router';

interface AuthResponse {
  status: string;
  success: string;
  token: string;
}

interface JWTResponse {
  status: string;
  success: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  tokenKey = 'JWT';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  authToken: string = undefined;
  id: Subject<string> = new Subject<string>();
  loggedIn: Subject<Boolean> = new Subject<Boolean>();
  loggedOut: Subject<Boolean> = new Subject<Boolean>();


   constructor(private http: HttpClient,
     private processHTTPMsgService: ProcessHttpmsgService, private router: Router) {
   }
   // , {headers: new HttpHeaders({'Authorization': 'bearer ' + this.authToken})}
   checkJWTtoken() {
     this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken', {headers: new HttpHeaders({'Authorization': 'bearer ' + this.authToken})})
     .subscribe(res => {
       console.log('JWT Token Valid: ', res);
       this.sendUsername(res.user.username);
       // this.sendId(res.user._id);
       this.sendLoggedIn(true);
     },
     err => {
       console.log('JWT Token invalid: ', err);
       this.destroyUserCredentials();
       this.logOut();

     });
   }

   sendUsername(name: string) {
     this.username.next(name);
   }

  //  sendId(id: string) {
  //   this.id.next(id);
  // }

  sendLoggedIn(status: Boolean) {
    this.loggedIn.next(status);
  }

  sendLoggedOut(status: Boolean) {
    this.loggedOut.next(status);
  }

   clearUsername() {
     this.username.next(undefined);
   }

   loadUserCredentials() {

     const credentials = JSON.parse(localStorage.getItem(this.tokenKey));
     console.log('loadUserCredentials ', credentials);
     if (credentials && credentials.username !== undefined) {
      this.useCredentials(credentials);
      if (this.authToken) {
        this.checkJWTtoken();
      }

    }

  }

   storeUserCredentials(credentials: any) {
     console.log('storeUserCredentials ', credentials);
     localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
     this.useCredentials(credentials);
   }

   useCredentials(credentials: any) {
     this.isAuthenticated = true;
     this.sendUsername(credentials.username);
     this.authToken = credentials.token;
     console.log('token is ' + this.authToken);
     const helper = new JwtHelperService();
     console.log(helper.decodeToken(this.authToken));
     this.id = helper.decodeToken(this.authToken)._id;
     // this.userid = helper.decodeToken(this.authToken)._id;
     console.log('id is ' + this.id);
     // this.sendId(helper.decodeToken(this.authToken)._id);
     this.sendLoggedIn(true);
     this.sendLoggedOut(false);
   }

   destroyUserCredentials() {
     this.authToken = undefined;
     this.clearUsername();
     this.isAuthenticated = false;
     localStorage.removeItem(this.tokenKey);
     this.sendLoggedOut(true);
     this.sendLoggedIn(false);
   }

   signUp(user: any): Observable<any> {
     return this.http.post<any>(baseURL + 'users/signup', user);

   }

   logIn(user: any): Observable<any> {
     return this.http.post<AuthResponse>(baseURL + 'users/login',
       {'username': user.username, 'password': user.password})
       .pipe( map(res => {
           this.storeUserCredentials({username: user.username, token: res.token});
           return {'success': true, 'username': user.username };
       }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
   }

   logOut() {
     this.destroyUserCredentials();
     this.sendLoggedIn(false);
     this.sendLoggedOut(true);
     this.router.navigate(['/login']);
   }

   isLoggedIn(): Boolean {
     return this.isAuthenticated;
   }

   getUsername(): Observable<string> {
     return this.username.asObservable();
   }

   getId(): Observable<string> {
    return this.id.asObservable();
  }

   getToken(): string {
     return this.authToken;
   }

   getLoggedIn(): Observable<Boolean> {
     return this.loggedIn.asObservable();
   }

   getLoggedOut(): Observable<Boolean> {
    return this.loggedOut.asObservable();
  }

}
