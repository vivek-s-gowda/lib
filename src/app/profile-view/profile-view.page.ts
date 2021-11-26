import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewLinkComponent } from '../add-new-link/add-new-link.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
})
export class ProfileViewPage implements OnInit {
  constructor(public modalController: ModalController) {}

  editView: boolean = false;
  ngOnInit() {}

  editProfile() {
    this.editView = !this.editView;
  }

  async addNewLink() {
      const modal = await this.modalController.create({
        component: AddNewLinkComponent,
        cssClass: 'newLinkModal',
        backdropDismiss: true,
      });
      return await modal.present();
  }
}
