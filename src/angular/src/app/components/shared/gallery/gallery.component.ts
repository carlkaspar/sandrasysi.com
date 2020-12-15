import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GalleryService} from "../../../_services/gallery.service";
import {ImageService} from "../../../_services/image.service";
import {Image} from "../../../_models/gallery/image";
import {ActivatedRoute, Route} from "@angular/router";
import {DeleteGalleryComponent} from "../../modals/delete-gallery/delete-gallery.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DeleteImageComponent} from "../../modals/delete-image/delete-image.component";
import {Gallery} from "../../../_models/gallery/gallery";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  section: ElementRef<HTMLElement>;

  images: Image[] = [];
  gallery: Gallery;

  constructor(
    private galleryService: GalleryService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    let galleryName = this.route.snapshot.paramMap.get("name");
    this.galleryService.getGalleryByName(galleryName).subscribe(
      response => {
        this.gallery = response;
        this.imageService.getImagesByGalleryName(this.gallery.name).subscribe(
          response => {
            this.images = response;
          },
          error => {
            console.log(error)
          }
        );
      },
      error => {
        console.log(error);
      }
    );


  }


  openDeleteModal(image: Image, gallery: Gallery) {
    const modalRef = this.modalService.open(DeleteImageComponent);
    modalRef.componentInstance.image = image;
    modalRef.componentInstance.gallery = gallery;
    modalRef.closed.subscribe(result => {
      this.images.forEach((item, index) => {
        if(item === result) this.images.splice(index, 1);
      })
    })
  }
}
