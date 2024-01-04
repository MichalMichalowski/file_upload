import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface ImageWithPreview {
  fileObj: File;
  imageSrc: string | ArrayBuffer | null;
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  form: FormGroup;
  images: ImageWithPreview[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      uploadChoice: new FormControl('localFolder')
  });
  }
  uploadFiles() {
    console.log(this.images);
  }

  removeFilesFromList(index: number) {
    if (this.images && this.images.length > 0) {
      this.images.splice(index,1);
    }
  }

  onFilesSelected(event: any) {
    const filesList: File[] = event.target.files;
    for (let i = 0; i < filesList.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileWithPreview: ImageWithPreview = {
          fileObj: filesList[i],
          imageSrc: e.target?.result ? e.target?.result : null
        };
        this.images.push(fileWithPreview);
      };
      reader.readAsDataURL(filesList[i]);
    }
  }

}
