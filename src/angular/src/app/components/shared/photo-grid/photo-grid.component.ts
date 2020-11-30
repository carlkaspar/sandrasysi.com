import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GalleryService} from "../../../_services/gallery.service";
import {Gallery} from "../../../_models/gallery/gallery";
import {ImageService} from "../../../_services/image.service";
import {Image} from "../../../_models/gallery/image";
import {DomSanitizer} from "@angular/platform-browser";



@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.css']
})
export class PhotoGridComponent implements OnInit {

  galleries: Gallery[] = [];


  constructor(
    private http: HttpClient,
    private galleryService: GalleryService,
    private imageService: ImageService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.galleryService.getGalleries().subscribe(
      response => {
        this.galleries = response;
      },
      error => {
        console.log(error)
      }
    )
  }


  getImage(thumbnailImage: File): string {
    let reader = new FileReader();
    let url = '';
    reader.readAsDataURL(thumbnailImage);
    reader.onload = (event) => {
      url = <string>event.target.result;
    }
    return url;
  }

  imageSrcFromByteArray(thumbnailBytes: string) {
    let url = 'data:image/jpeg;base64,' + thumbnailBytes;
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}
