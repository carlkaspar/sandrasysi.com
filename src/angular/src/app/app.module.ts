import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { DigitalComponent } from './components/digital/digital.component';
import { AnalogueComponent } from './components/analogue/analogue.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { GalleryFormComponent } from './components/shared/gallery-form/gallery-form.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import { PhotoGridComponent } from './components/shared/photo-grid/photo-grid.component';
import { GalleryComponent } from './components/shared/gallery/gallery.component';
import { ImageCropperModule } from "ngx-image-cropper";
import {MasonryGalleryModule} from "ngx-masonry-gallery";
import {NgxMasonryModule} from "ngx-masonry";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteGalleryComponent } from './components/modals/delete-gallery/delete-gallery.component';
import { DeleteImageComponent } from './components/modals/delete-image/delete-image.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DigitalComponent,
    AnalogueComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    GalleryFormComponent,
    PhotoGridComponent,
    GalleryComponent,
    DeleteGalleryComponent,
    DeleteImageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgxDropzoneModule,
        ImageCropperModule,
        NgxMasonryModule,
        BrowserAnimationsModule,
        NgbModule
    ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DeleteGalleryComponent, DeleteImageComponent]
})
export class AppModule { }
