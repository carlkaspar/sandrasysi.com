import {Component, Input, OnInit} from '@angular/core';
import {Image} from "../../../_models/gallery/image";
import {ImageService} from "../../../_services/image.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Gallery} from "../../../_models/gallery/gallery";

@Component({
  selector: 'app-delete-image',
  templateUrl: './delete-image.component.html',
  styleUrls: ['./delete-image.component.css']
})
export class DeleteImageComponent implements OnInit {

  @Input() public image: Image;
  @Input() public gallery: Gallery;

  constructor(
    private imageService: ImageService,
    private ngbActiveModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  deleteImage() {
    const formData = new FormData();
    formData.append("id", this.image.id.toString());
    formData.append("galId", this.gallery.id.toString());
    this.imageService.delete(formData).subscribe(
      response => {
        console.log(response);
      }, error => {
        console.log(error);
      }
    )

    this.ngbActiveModal.close(this.image);

    //TODO: what if user deletes thumbnail image?
  }
}
