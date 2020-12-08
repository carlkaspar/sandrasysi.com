import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGalleryComponent } from './delete-gallery.component';

describe('DeleteGalleryComponent', () => {
  let component: DeleteGalleryComponent;
  let fixture: ComponentFixture<DeleteGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
