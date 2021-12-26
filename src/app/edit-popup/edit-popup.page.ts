import { Component, Input, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { LinkService } from '../services/link.service';
import { ValueChangesService } from '../services/value-changes.service';
import { FirebaseUploadService } from '../services/firebase-upload.service';
import { ModalController } from '@ionic/angular';
import { ImageCropPage } from './image-crop/image-crop.page';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.page.html',
  styleUrls: ['./edit-popup.page.scss'],
})
export class EditPopupPage implements OnInit {
  bio: string = '';
  @Input() data: any;
  @Input() name: string;

  barStatus = false;
  imageUploads = [];
  constructor(
    private popoverCtrl: PopoverController,
    private alertController: AlertController,
    private linkService: LinkService,
    private valueChangesService: ValueChangesService,
    private firebaseUploadService: FirebaseUploadService,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  setMenuValues(menuItem) {
    // this.popoverCtrl.dismiss();
    this.valueChangesService.setValues(menuItem);
  }

  async addBio() {
    this.popoverCtrl.dismiss();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-alert',
      header: 'Bio',
      inputs: [
        {
          name: 'bio',
          type: 'text',
          placeholder: 'Bio',
          value: this.bio,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Save',
          handler: (alertData) => {
            this.data['bio'] = alertData.bio;
            this.linkService.update(this.name, this.data);
            this.valueChangesService.setValues('UPDATED_BIO');
          },
        },
      ],
    });

    await alert.present();
  }

  async uploadPhoto(event) {
    this.barStatus = true;
    const modal = await this.modalController.create({
      component: ImageCropPage,
      cssClass: 'newLinkModal',
      backdropDismiss: true,
      componentProps: { imageChangedEvent: event },
    });
    modal.onDidDismiss().then(async (data: any) => {
      if(this.data['dpPath'] != '') {
        this.firebaseUploadService.deleteFile(this.data['dpPath']);
      }
      this.firebaseUploadService.storeImage(data.data.croppedImage).then(
        (res: any) => {
          if (res) {
            this.data['dpPath'] = res;
            this.linkService.update(this.name, this.data);
            this.valueChangesService.setValues('UPDATE_PROFILE');
            this.barStatus = false;
            this.popoverCtrl.dismiss();
          }
        },
        (error: any) => {
          this.barStatus = false;
        }
      );
    });
    return await modal.present();
  }


}
