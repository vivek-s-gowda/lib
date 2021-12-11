import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropPage } from './image-crop.page';

const routes: Routes = [
  {
    path: '',
    component: ImageCropPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),ImageCropperModule],
  exports: [RouterModule,ImageCropperModule],
})
export class ImageCropPageRoutingModule {}
