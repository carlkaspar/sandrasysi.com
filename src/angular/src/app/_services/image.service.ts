import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {SafeResourceUrl} from "@angular/platform-browser";
import {map} from "rxjs/operators";
import {Gallery} from "../_models/gallery/gallery";
import {Image} from "../_models/gallery/image";

const IMG_API = `${environment.apiUrl}/image`

const headers = new HttpHeaders()
  .append('Authorization', `Bearer ${localStorage.getItem("token")}`);

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  photoUrl: SafeResourceUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getImageById(id: number): Observable<any> {
    const url = `${IMG_API}/get/${id}`
    return this.http.get(url, {
        headers: headers
      }).pipe(
      map((data: any[]) =>
        data.map(
          (item: any) =>
            new Image(item.id, item.name, item.relativePath)
        )
      )
    );
  }
}
