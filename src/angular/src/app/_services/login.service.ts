import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const AUTH_API = `${environment.apiUrl}/auth`;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + '/login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }
}
