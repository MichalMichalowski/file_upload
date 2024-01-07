import { Injectable } from '@angular/core';
import { AppImage } from '../models/image';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SendingParams } from '../models/sending-params';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private imagesSubject = new BehaviorSubject<AppImage[]>([]);
  appImages$ = this.imagesSubject.asObservable();

  private uploadParamsSubject = new BehaviorSubject<FormGroup>(new FormGroup({}));
  uploadParams$ = this.uploadParamsSubject.asObservable();

  pathToSaveFiles: string;
  apiBaseUrl = 'http://localhost:8080/api/v1/files';

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder) {
                const form = this.formBuilder.group({
                  uploadChoice: new FormControl('localFolder'),
                  path: new FormControl('')
              });
              this.uploadParamsSubject.next(form);
   }

  public saveFiles(): Observable<string> {
    const formData = this.convertToFormData(this.imagesSubject.value, this.uploadParamsSubject.value.value);
    const uploadParams: any = this.uploadParamsSubject.value.value;
    formData.append('test', JSON.stringify(uploadParams));
    return this.http.post<string>(`${this.apiBaseUrl}/upload`,formData);
  }

  public updateImages(images: AppImage[]): void {
    this.imagesSubject.next(images);
  }

  public updateParams(params: FormGroup): void {
    this.uploadParamsSubject.next(params);
  }

  private convertToFormData(files: AppImage[], uploadParams: any): FormData {
    const formData: FormData = new FormData();

    files.forEach( (file) => {
      formData.append('files', file.fileObj, file.fileObj.name);
    } );
    return formData;
  }
}
