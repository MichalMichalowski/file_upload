import { Injectable } from '@angular/core';
import { AppImage } from '../models/image';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  storedImages: AppImage[] = [];
  apiBaseUrl = 'http://localhost:8080/api/v1/files';

  constructor(private http: HttpClient) { }

  public saveFiles(): Observable<string> {
    const files = this.convertToFormData(this.storedImages);
    return this.http.post<string>(`${this.apiBaseUrl}/upload`,files);
  }

  private convertToFormData(files: AppImage[]): FormData {
    const formData: FormData = new FormData();

    files.forEach( (file) => {
      formData.append('files', file.fileObj, file.fileObj.name);
    } );

    return formData;
  }
}
