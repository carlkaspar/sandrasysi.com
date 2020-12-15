import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {SafeResourceUrl} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Image} from "../_models/gallery/image";


const CONTENT_API = `${environment.apiUrl}/uploads`;
const ADMIN_API = `${environment.apiUrl}/admin`

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


  getImagesByGalleryName(galleryName: string): Observable<any> {
    const apiUrl = `${CONTENT_API}/${galleryName}/getimages`;
    return this.http.get(apiUrl).pipe(
      map((data: any[]) =>
        data.map(
          (item: any) =>
            new Image(item.id, item.name)
        )
      )
    )
  }

  delete(formData: FormData): Observable<any> {
    const apiUrl = `${ADMIN_API}/image/delete`;
    return this.http.post(apiUrl, formData, {headers: headers})
  }
}
