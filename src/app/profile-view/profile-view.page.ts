import { Component, Inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddLinkModalPage } from '../add-link-modal/add-link-modal.page';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../model/data.model';
import { LinkService } from '../services/link.service';

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
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.username = params.username;
    });
    this.route.params.subscribe((params) => {
      this.userId = params.user;
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
    this.linkService.getUser(this.userId);
    this.linkService.subject$.subscribe((res) => {
      if (res != null) {
        this.noUserFound = 'userfound';
        this.updatedUserData = res;
        this.links = res['link'];
        this.name = res['name'];
        this.bio = res['bio'];
        this.dpPath = res['dpPath'];
        console.log(this.updatedUserData, '-------------------------');
      } else {
        this.noUserFound = 'usernotfound';
      }
    });
  }

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
}
