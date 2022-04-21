import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { IconsModalPage } from './icons-modal/icons-modal.page'

@Component({
  selector: 'app-add-link-modal',
  templateUrl: './add-link-modal.page.html',
  styleUrls: ['./add-link-modal.page.scss'],
})
export class AddLinkModalPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) {}

  linkForm: FormGroup;
  // reg = 'http';
  urlPattern2 =
    /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  ngOnInit() {
    this.linkForm = this.fb.group({
      imageUrl: [
        '',
      ],
      linkUrl: [
        '',
        [Validators.required, Validators.pattern(this.urlPattern2)],
      ],
      linkName: ['', Validators.required],
    });
  }

  ionViewWillEnter() {}

  addNewLink() {
    this.modalController.dismiss({
      dismissed: true,
      newLink: this.linkForm.value,
    });
  }

  dissmiss() {
    this.modalController.dismiss();
  }

  async openIconModal() {
    const modal = await this.modalController.create({
      component: IconsModalPage,
      cssClass: 'qr-modal',
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(async (data: any) => {
      console.log(data)
      this.linkForm.get('imageUrl').setValue(data.data.imagePath)
    });
    return await modal.present();
  }
}
