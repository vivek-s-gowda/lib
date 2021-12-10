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
  ngOnInit() {
    this.icons = this.iconService.getIconsList();
    this.linkForm = this.fb.group({
      icon: ['', Validators.required],
      linkUrl: ['', Validators.required],
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
}
