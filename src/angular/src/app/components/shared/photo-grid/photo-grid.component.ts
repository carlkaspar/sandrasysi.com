import {AfterViewInit, Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GalleryService} from "../../../_services/gallery.service";
import {Gallery} from "../../../_models/gallery/gallery";
import {ImageService} from "../../../_services/image.service";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";



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
    private domSanitizer: DomSanitizer,
    private router: Router
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


  goToGalleryPage(galleryName: string) {
    this.router.navigate(['galerii/' + galleryName]);
  }
}
