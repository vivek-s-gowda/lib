import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-wa-link',
  templateUrl: './wa-link.page.html',
  styleUrls: ['./wa-link.page.scss'],
})
export class WaLinkPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) {}

  linkForm: FormGroup;
  selectedIcon = 'whatsapp';
  iconsLoaded = [];
  loadCounter: number = 0;
  // reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  
  urlPattern2 = /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  ngOnInit() {
    this.linkForm = this.fb.group({
      icon: ['whatsapp', Validators.required],
      linkUrl: [''],
      phone: ['', [Validators.required]]
    });
  }

  addQuicLink() {
    this.linkForm.get('linkUrl').setValue(`https://api.whatsapp.com/send/?phone=91${this.linkForm.get('phone').value}&text&app_absent=0`);
    this.modalController.dismiss({
      dismissed: true,
      newLink: this.linkForm.value,
    });
  }

  dissmiss() {
    this.modalController.dismiss();
  }
}
