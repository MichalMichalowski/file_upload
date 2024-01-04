import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { FilesGalleryComponent } from './components/files-gallery/files-gallery.component';

const routes: Routes = [
  { path: '', redirectTo: '/#', pathMatch: 'full' },
  { path: '#', component: WelcomeComponent },
  { path: 'section/upload', component: UploadFileComponent },
  { path: 'section/gallery', component: FilesGalleryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
