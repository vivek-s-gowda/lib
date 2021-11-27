import { Component, Inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddLinkModalPage } from '../add-link-modal/add-link-modal.page';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
})
export class ProfileViewPage implements OnInit {
  constructor(
    public modalController: ModalController,
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => console.log(params));
  }

  editView: boolean = false;
  links = [
    {
      imageUrl:
        'https://lh3.googleusercontent.com/-169teTA_3vI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck8Hcd40DI7czgwOv2JRdXZVtqptw/photo.jpg?sz=46',
      linkUrl: 'https://google.com',
      linkName: 'Facebook',
    },
  ];
  ngOnInit() {}

  editProfile() {
    this.editView = !this.editView;
  }

  async addNewLink() {
    const modal = await this.modalController.create({
      component: AddLinkModalPage,
      cssClass: 'newLinkModal',
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(async (data: any) => {
      this.links.push(data.data.newLink);
    });
    return await modal.present();
  }

  openLink(link: string) {
    this.document.location.href = link;
  }
}
