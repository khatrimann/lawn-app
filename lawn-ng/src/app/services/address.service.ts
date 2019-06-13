import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getLawns() {
    return this.http.get(baseURL + 'users');
  }
}
