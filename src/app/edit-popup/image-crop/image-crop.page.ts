import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.page.html',
  styleUrls: ['./image-crop.page.scss'],
})
export class ImageCropPage implements OnInit {
  inputImage: any;
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  @Input() imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  dismiss() {
    fetch(this.croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'File name', { type: 'image/png' });
        this.modalController.dismiss({
          dismissed: true,
          croppedImage: file,
        });
      });
  }
}
