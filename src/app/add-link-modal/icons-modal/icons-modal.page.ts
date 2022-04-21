import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-icons-modal',
  templateUrl: './icons-modal.page.html',
  styleUrls: ['./icons-modal.page.scss'],
})
export class IconsModalPage implements OnInit {
  imageLinks: string[] = [];
  constructor(private modal: ModalController) {
    this.imageLinks = Array(90)
      .fill(0)
      .map((x, i) => `assets/link-icons/link-icon (${i + 1}).png`);
  }

  ngOnInit() {}

  dissmiss() {
    this.modal.dismiss();
  }

  selectImage(imagePath) {
    console.log(`selectImage`, imagePath);
    this.modal.dismiss({ imagePath: imagePath });
  }
}
