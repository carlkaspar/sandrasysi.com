import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

const GAL_API = `${environment.apiUrl}/gallery`;

const headers = new HttpHeaders()
  .append('Authorization', `Bearer ${localStorage.getItem("token")}`);

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  public upload(formData): Observable<any> {
    return this.httpClient.post(`${GAL_API}/upload`, formData, {
      headers: headers
    })
  }
}
