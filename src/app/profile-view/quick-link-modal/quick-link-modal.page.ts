import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Icons } from '../iconLibrary/icons';

@Component({
  selector: 'app-quick-link-modal',
  templateUrl: './quick-link-modal.page.html',
  styleUrls: ['./quick-link-modal.page.scss'],
})
export class QuickLinkModalPage implements OnInit {
  constructor(
    private iconService: Icons,
    private modalController: ModalController,
    private fb: FormBuilder
  ) {}

  linkForm: FormGroup;
  selectedIcon = '';
  icons = [];
  iconsLoaded = [];
  loadCounter: number = 0;
  // reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  
  urlPattern2 = /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  ngOnInit() {
    this.icons = this.iconService.getIconsList();
    this.iconsLoaded = [...this.icons[this.loadCounter]];
    this.linkForm = this.fb.group({
      icon: ['', Validators.required],
      linkUrl: ['', [Validators.required, Validators.pattern(this.urlPattern2)]],
    });
  }

  selectQuickLinkIcon(iconName) {
    this.selectedIcon = iconName;
    this.linkForm.get('icon').setValue(this.selectedIcon);
  }

  addQuicLink() {
    this.modalController.dismiss({
      dismissed: true,
      newLink: this.linkForm.value,
    });
  }

  loadData(ev) {
    setTimeout(() => {
      ev.target.complete();
      this.loadCounter++;
      this.iconsLoaded = [...this.iconsLoaded, ...this.icons[this.loadCounter]];
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      //   ev.target.disabled = true;
      // }
    }, 500);
  }

  dissmiss() {
    this.modalController.dismiss();
  }
}
