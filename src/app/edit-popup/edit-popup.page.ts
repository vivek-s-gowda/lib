import { Component, Input, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { LinkService } from '../services/link.service';
import { ValueChangesService } from '../services/value-changes.service';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.page.html',
  styleUrls: ['./edit-popup.page.scss'],
})
export class EditPopupPage implements OnInit {
  bio: string = '';
  @Input() data: any;
  @Input() name: string;
  constructor(
    private popoverCtrl: PopoverController,
    private alertController: AlertController,
    private linkService: LinkService,
    private valueChangesService: ValueChangesService
  ) {}

  ngOnInit() {}

  dismiss() {
    this.popoverCtrl.dismiss();
  }

  setMenuValues(menuItem) {
    this.popoverCtrl.dismiss();
    this.valueChangesService.setValues(menuItem);
  }

  async addBio() {
    this.popoverCtrl.dismiss();
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
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
          },
        },
      ],
    });

    await alert.present();
  }
}
