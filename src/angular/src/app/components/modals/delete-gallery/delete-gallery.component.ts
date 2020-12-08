import {Component, Input, OnInit} from '@angular/core';
import {GalleryService} from "../../../_services/gallery.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-gallery',
  templateUrl: './delete-gallery.component.html',
  styleUrls: ['./delete-gallery.component.css']
})
export class DeleteGalleryComponent implements OnInit {

  @Input() public gallery;

  constructor(
    private galleryService: GalleryService,
    private ngbActiveModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
  }

  deleteGallery() {
    const formData = new FormData();
    formData.append("id", this.gallery.id)
    this.galleryService.delete(formData).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(error)
      }
    );

    this.ngbActiveModal.close();


  }
}
