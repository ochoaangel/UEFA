import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  baseUrl;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://api.football-data.org/v2/competitions/CL/matches';
  }

  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////  GET  ///////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  isOperative(): Observable<any> {
    const url = '?season=2019';
    const urlFinal = this.baseUrl + url;
    return this.http.get<any>(urlFinal);
  }
  


}
