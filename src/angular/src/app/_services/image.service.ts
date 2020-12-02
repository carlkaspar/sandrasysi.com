import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {SafeResourceUrl} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Image} from "../_models/gallery/image";

const GAL_API = `${environment.apiUrl}/gallery`;
const UPLOADS_API = `${environment.apiUrl}/uploads`;

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

  public getImagesByGalleryId(id: number): Observable<any> {
    const apiUrl = `${GAL_API}/${id}/images`;
    return this.http.get(apiUrl, {headers: headers}).pipe(
      map((data: any[]) =>
        data.map(
          (item: any) =>
            new Image(item.id, item.name)
        )
      )
    )
  }

  getImageByGalleryNameAndImageName(galleryName: string, imageName: string): Observable<any> {
    const apiUrl = `${GAL_API}/getImage/${galleryName}/${imageName}`;
    return this.http.get(apiUrl, {headers: headers});
  }

  getImagesByGalleryName(galleryName: string): Observable<any> {
    const apiUrl = `${UPLOADS_API}/${galleryName}/getimages`;
    return this.http.get(apiUrl).pipe(
      map((data: any[]) =>
        data.map(
          (item: any) =>
            new Image(item.id, item.name)
        )
      )
    )
  }
}
