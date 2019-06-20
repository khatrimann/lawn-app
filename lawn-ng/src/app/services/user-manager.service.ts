import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  constructor(private http: HttpClient) { }

  verifyUser(email, token): Observable<any> {
    return this.http.get<any>(baseURL + `manager/verify?email=${email}&token=${token}`);
  }
}
