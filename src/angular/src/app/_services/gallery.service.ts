import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {environment} from "../../environments/environment";

const GAL_API = `${environment.apiUrl}/gallery`;

const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .append('Authorization', `Bearer ${localStorage.getItem("token")}`);

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  public upload(formData) {
    return this.httpClient.post<any>(`${GAL_API}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
