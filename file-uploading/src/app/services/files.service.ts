import { Injectable } from '@angular/core';
import { AppImage } from '../models/image';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private imagesSubject = new BehaviorSubject<AppImage[]>([]);
  appImages$ = this.imagesSubject.asObservable();

  //storedImages: AppImage[] = [];
  pathToSaveFiles: string;
  apiBaseUrl = 'http://localhost:8080/api/v1/files';

  constructor(private http: HttpClient) { }

  public saveFiles(): Observable<string> {
    const files = this.convertToFormData(this.imagesSubject.value);
    return this.http.post<string>(`${this.apiBaseUrl}/upload`,files);
  }

  public updateImages(images: AppImage[]): void {
    this.imagesSubject.next(images);
  }

  private convertToFormData(files: AppImage[]): FormData {
    const formData: FormData = new FormData();

    files.forEach( (file) => {
      formData.append('files', file.fileObj, file.fileObj.name);
    } );

    return formData;
  }
}
