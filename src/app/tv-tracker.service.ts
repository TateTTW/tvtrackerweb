import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TvTrackerService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const url = "/authenticate";
    const headers = new HttpHeaders({'Content-Type':'text/plain; charset=utf-8'});
    const params = {
      username: username,
      password: password
    };
    const options = {  responseType: 'text' as const, headers: headers, params: this.createHttpParams(params)};
    return this.http.get(url, options);
  }

  browse(text: string, type: string, page: number): Observable<any> {
    const url = "https://movie-database-alternative.p.rapidapi.com";
    const headers = new HttpHeaders({'x-rapidapi-key': ''});
    const params = {
      s: encodeURIComponent(text),
      type: type,
      page: page,
      r: "json"
    };
    const options = { headers: headers, params: this.createHttpParams(params)};
    return this.http.get(url, options);
  }

  getSaved(username: string, token: string): Observable<any> {
    const url = "/getMediaEntries";
    const params = {
      username: username,
      token: token,
    };
    const options = { params: this.createHttpParams(params) };
    return this.http.get(url, options);
  }

  private createHttpParams(params: any): HttpParams {
    let httpParams: HttpParams = new HttpParams();
    Object.keys(params).forEach(param => {
      if(params[param]){
        httpParams = httpParams.set(param, params[param]);
      }
    });

    return httpParams;
  }
}
