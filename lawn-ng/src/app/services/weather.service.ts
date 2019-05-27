import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(x, y): Observable<any> {
    return this.http.get<any>(baseURL + `weather/?x=${x}&y=${y}`);
  }
}
