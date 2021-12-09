import { Component, Inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddLinkModalPage } from '../add-link-modal/add-link-modal.page';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../model/data.model';
import { LinkService } from '../services/link.service';
import { PopoverController } from '@ionic/angular';
import { EditPopupPage } from '../edit-popup/edit-popup.page';
import { ValueChangesService } from '../services/value-changes.service';
import { ShowQrPage } from './show-qr/show-qr.page';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
})
export class ProfileViewPage implements OnInit {
  constructor(
    public modalController: ModalController,
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private linkService: LinkService,
    private router: Router,
    public popoverController: PopoverController,
    private valueChangesService: ValueChangesService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.username = params.username;
    });
    this.route.params.subscribe((params) => {
      this.userId = params.user;
    });
    this.valueChangesService.menuValueChanges.subscribe((val) => {
      // if (val == 'ADD_NEW_LINK') {
      //   this.addNewLink();
      // }
      switch (val) {
        case 'ADD_NEW_LINK': {
          this.addNewLink();
          break;
        }
        case 'GET_MY_QR': {
          this.showQr();
        }
      }
    });
  }
  username: string = '';
  name: string = '';
  bio: string = '';
  dpPath: string = '';
  updatedUserData: User;
  editView: boolean = false;
  links: any = [];
  userId: string = '';
  noUserFound: string = 'inprogress';
  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.linkService.getUser(this.userId);
    this.linkService.subject$.subscribe((res) => {
      if (res != null) {
        this.noUserFound = 'userfound';
        this.updatedUserData = res;
        this.links = res['link'] != undefined ? res['link'] : [];
        this.name = res['name'];
        this.bio = res['bio'];
        this.dpPath = res['dpPath'];
      } else {
        this.noUserFound = 'usernotfound';
      }
    });
  }

  async showQr() {
    const modal = await this.modalController.create({
      component: ShowQrPage,
      cssClass: 'newLinkModal',
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(async (data: any) => {});
    return await modal.present();
  }

  editProfile() {}

  async addNewLink() {
    const modal = await this.modalController.create({
      component: AddLinkModalPage,
      cssClass: 'newLinkModal',
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(async (data: any) => {
      this.links.push(data.data.newLink);
      this.updatedUserData['link'] = this.links;
      this.linkService.update(this.name, this.updatedUserData);
    });
    return await modal.present();
  }

  openLink(link: string) {
    this.document.location.href = link;
  }

  goHome() {
    this.router.navigate(['/']);
  }

  async editProfilePopup(ev: any) {
    // this.editView = !this.editView;
    const popover = await this.popoverController.create({
      component: EditPopupPage,
      componentProps: {
        name: this.name,
        data: this.updatedUserData,
      },
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
