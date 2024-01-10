import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilesService } from 'src/app/services/files.service';
import { AppImage } from '../../models/image';
import { SendingParams } from 'src/app/models/sending-params';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  form: FormGroup;
  images: AppImage[] = [];
  params: SendingParams = new SendingParams();
  progress: number = 0;

  constructor(private filesService: FilesService) { }

  ngOnInit(): void {
  this.fetchParams();
  this.fetchImages();
  this.filesService.progress$.subscribe((progress) => {
    this.progress = progress;
  });
  }
  
  uploadFiles() {
    this.filesService.saveFiles().subscribe( res => {
      console.log(res);
      //this.progress = 0;
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

  public updateParams() {
    this.filesService.updateParams(this.form);
  }

  private fetchImages(): void {
    this.filesService.appImages$.subscribe( data => {
      this.images = data;
    }); 
  }

  private fetchParams(): void {
    this.filesService.uploadParams$.subscribe( par => {
      this.form = par;
    });
    
  }

}
