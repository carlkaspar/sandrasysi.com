import {Component} from '@angular/core';
import {GalleryService} from "../../../_services/gallery.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.css']
})
export class GalleryFormComponent {

  constructor(
    private galleryService: GalleryService
  ) {
  }

  galleryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    thumbnail: new FormControl('', [Validators.required])
  });

  files: File[] = [];
  isButtonDisabled = true;


  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.isButtonDisabled = false;
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    if (!this.files.length) {
      this.isButtonDisabled = true;
    }
  }

  get name(): AbstractControl {
    return this.galleryForm.get('name');
  }

  get fileArray(): AbstractControl {
    return this.galleryForm.get('fileArray');
  }

  onClick() {
    const formData = new FormData();

    for(let file of this.files) {
      console.log(file);
      formData.append("files", file);
    }

    formData.append("name", this.galleryForm.value.name);
    formData.append("thumbnailImageName", this.galleryForm.value.thumbnail)

    this.galleryService.upload(formData).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }
}

