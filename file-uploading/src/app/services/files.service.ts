import { Injectable } from '@angular/core';
import { AppImage } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  storedImages: AppImage[] = [];

  constructor() { }
}
