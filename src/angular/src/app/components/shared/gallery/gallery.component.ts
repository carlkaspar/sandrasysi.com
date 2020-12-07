import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GalleryService} from "../../../_services/gallery.service";
import {ImageService} from "../../../_services/image.service";
import {Image} from "../../../_models/gallery/image";
import {ActivatedRoute, Route} from "@angular/router";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  section: ElementRef<HTMLElement>;

  images: Image[] = [];
  galleryName: string;

  constructor(
    private galleryService: GalleryService,
    private imageService: ImageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.galleryName = this.route.snapshot.paramMap.get("name");
    this.imageService.getImagesByGalleryName(this.galleryName).subscribe(
      response => {
        this.images = response;
      },
      error => {
        console.log(error)
      }
    );
  }


}
