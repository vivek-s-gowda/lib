import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageCropPageRoutingModule } from './image-crop-routing.module';

import { ImageCropPage } from './image-crop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCropPageRoutingModule
  ],
  declarations: [ImageCropPage]
})
export class ImageCropPageModule {}
