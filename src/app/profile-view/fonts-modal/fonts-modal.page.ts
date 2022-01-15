import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fonts-modal',
  templateUrl: './fonts-modal.page.html',
  styleUrls: ['./fonts-modal.page.scss'],
})
export class FontsModalPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  close() {
    this.modalController.dismiss();
  }
}
