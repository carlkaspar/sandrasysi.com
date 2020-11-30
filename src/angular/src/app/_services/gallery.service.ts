import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Gallery} from "../_models/gallery/gallery";
import {map} from "rxjs/operators";

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

  getGalleries(): Observable<any> {
    const url = `${GAL_API}/get`
    return this.httpClient
      .get(url, {
        headers: headers
      })
      .pipe(
        map((data: any[]) =>
          data.map(
            (item: any) =>
              new Gallery(item.id, item.thumbnailBytes)
          )
        )
      )
  }

  private convertToList(galleryImageIds: string): Array<number> {
    return galleryImageIds
      .replace(/\s/g, "")
      .split(',')
      .map(function (item) {
        return parseInt(item)
      });
  }

}
