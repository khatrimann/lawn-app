import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, config } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { baseURL } from '../shared/baseurl';
import { JwtHelperService } from '@auth0/angular-jwt';


interface AuthResponse {
  status: string;
  success: string;
  token: string;
  id: string;
}


interface JWTResponse {
  status: string;
  success: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey = 'JWT';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  authToken: string = undefined;
  uName = undefined;
  loggedIn: Subject<Boolean> = new Subject<Boolean>();
  loggedOut: Subject<Boolean> = new Subject<Boolean>();

   constructor(private http: HttpClient,
     private processHTTPMsgService: ProcessHttpmsgService) {
   }
   // , {headers: new HttpHeaders({'Authorization': 'bearer ' + this.authToken})}
   checkJWTtoken() {
     this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken', {headers: new HttpHeaders({'Authorization': 'bearer ' + this.authToken})})
     .subscribe(res => {
       console.log('JWT Token Valid: ', res);
       this.sendUsername(res.user.username);
       this.sendLoggedIn(true);

     },
     err => {
       console.log('JWT Token invalid: ', err);
       this.destroyUserCredentials();
     });
   }

   sendUsername(name: string) {
     if (name) {
     console.log('88888888888888', name);
     this.uName = name;
     this.username.next(name);
     }
   }



   clearUsername() {
     this.username.next(undefined);
   }

   getData() {
     let id = localStorage.getItem('id');
     return this.http.get(baseURL + 'users/getUsersbyAdmin?id=' + id);
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
     const helper = new JwtHelperService();
     console.log(typeof(helper.decodeToken(this.authToken)._id));
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

   signup(body: any): Observable<any> {
      return this.http.post<any>(baseURL + 'users/signup', body);
   }

   login(user: any): any {
     return this.http.post<AuthResponse>(baseURL + 'users/login',
       {'username': user.username, 'password': user.password});
   }

   logOut() {
     this.destroyUserCredentials();
   }

   isLoggedIn(): Boolean {
     return this.isAuthenticated;
   }

   getUsername(): any {
     return this.username.asObservable();
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

 sendLoggedIn(status: Boolean) {
  this.loggedIn.next(status);
}

sendLoggedOut(status: Boolean) {
  this.loggedOut.next(status);
}
}
