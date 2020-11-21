import {Component, ElementRef, ViewChild} from '@angular/core';
import {GalleryService} from "../../../_services/gallery.service";
import {catchError, map} from "rxjs/operators";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {of} from "rxjs";
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

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
    files: new FormControl([])
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

  onClick() {
    console.log(this.galleryForm);
    console.log(this.galleryForm.get('files').value);
    this.galleryForm.patchValue({files: this.files});
    console.log(this.galleryForm.get('files').value);
  }
}
