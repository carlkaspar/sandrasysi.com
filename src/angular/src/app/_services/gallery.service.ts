import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Gallery} from "../_models/gallery/gallery";
import {map} from "rxjs/operators";

const ADMIN_API = `${environment.apiUrl}/admin`;
const CONTENT_API =  `${environment.apiUrl}/uploads`;

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
    return this.httpClient.post(`${ADMIN_API}/gallery/upload`, formData, {
      headers: headers
    })
  }

  getGalleries(): Observable<any> {
    const url = `${CONTENT_API}/galleries`
    return this.httpClient
      .get(url, {
        headers: headers
      })
      .pipe(
        map((data: any[]) =>
          data.map(
            (item: any) =>
              new Gallery(item.id, item.name, item.thumbnailImageUrl)
          )
        )
      )
  }

  delete(formData): Observable<any> {
    const url = `${ADMIN_API}/gallery/delete`;
    return this.httpClient.post(url, formData, {headers: headers});
  }

  getGalleryByName(galleryName: string): Observable<any> {
    const url = `${CONTENT_API}/gallery/getByName/${galleryName}`;
    return this.httpClient.get(url, {headers: headers})
      .pipe(
        map((item: any) =>
          new Gallery(item.id, item.name)
        )
      )
  }
}
