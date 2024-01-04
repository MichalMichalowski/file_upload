import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesGalleryComponent } from './files-gallery.component';

describe('FilesGalleryComponent', () => {
  let component: FilesGalleryComponent;
  let fixture: ComponentFixture<FilesGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilesGalleryComponent]
    });
    fixture = TestBed.createComponent(FilesGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
