import { Component, OnInit } from '@angular/core';
import {GalleryService} from "../../../_services/gallery.service";
import {ImageService} from "../../../_services/image.service";
import {Image} from "../../../_models/gallery/image";
import {ActivatedRoute, Route} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  images: Image[] = [];
  galleryId: number;

  constructor(
    private galleryService: GalleryService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.galleryId = Number(this.route.snapshot.paramMap.get("id"));
    this.imageService.getImagesByGalleryId(this.galleryId).subscribe(
      response => {
        this.images = response;
      },
      error => {
        console.log(error)
      }
    )
  }

  imageSrcFromByteArray(thumbnailBytes: string) {
    let url = 'data:image/jpeg;base64,' + thumbnailBytes;
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

}
