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
      uploadChoice: new FormControl('localFolder'),
      path: new FormControl('')
  });
  this.fetchImages();
  }
  
  uploadFiles() {
    this.filesService.saveFiles().subscribe( res => {
      console.log(res);
    });
  }

  removeFilesFromList(index: number) {
    if (this.images && this.images.length > 0) {
      this.images.splice(index,1);
      this.filesService.updateImages(this.images);
      this.fetchImages();
    }
  }

  onFilesSelected(event: any) {
    const filesList: File[] = event.target.files;
    const selectedImages: AppImage[] = [];
    for (let i = 0; i < filesList.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileWithPreview: AppImage = {
          fileObj: filesList[i],
          imageSrc: e.target?.result ? e.target?.result : null
        };
        selectedImages.push(fileWithPreview);
      };
      reader.readAsDataURL(filesList[i]);
      this.filesService.updateImages(selectedImages);
      this.fetchImages();
    }
  }

  onRadioChange() {
    console.log(this.form.value);
  }

  private fetchImages(): void {
    this.filesService.appImages$.subscribe( data => {
      this.images = data;
    }); 
  }

}
