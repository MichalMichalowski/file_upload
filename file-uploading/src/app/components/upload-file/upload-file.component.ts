import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FilesService } from 'src/app/services/files.service';
import { AppImage } from '../../models/image';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  form: FormGroup;
  images: AppImage[] = [];

  constructor(private formBuilder: FormBuilder,
              private filesService: FilesService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      uploadChoice: new FormControl('localFolder')
  });
  this.images = this.getStoredImages();
  }
  
  uploadFiles() {
    console.log(this.filesService.storedImages);
  }

  removeFilesFromList(index: number) {
    if (this.filesService.storedImages && this.filesService.storedImages.length > 0) {
      this.filesService.storedImages.splice(index,1);
      this.images = this.getStoredImages();
    }
  }

  onFilesSelected(event: any) {
    const filesList: File[] = event.target.files;
    for (let i = 0; i < filesList.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileWithPreview: AppImage = {
          fileObj: filesList[i],
          imageSrc: e.target?.result ? e.target?.result : null
        };
        //this.images.push(fileWithPreview);
        this.filesService.storedImages.push(fileWithPreview);
      };
      reader.readAsDataURL(filesList[i]);
    }
  }

  getStoredImages(): AppImage[] {
    return this.filesService.storedImages;
  }

}
