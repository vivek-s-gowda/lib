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
import { ThemePage } from './theme/theme.page';
import { QuickLinkModalPage } from './quick-link-modal/quick-link-modal.page';
import { ToastController } from '@ionic/angular';
import { LocalStorageService } from '../services/localstorage.service';
import { FontsModalPage } from './fonts-modal/fonts-modal.page';
import { WaLinkPage } from './wa-link/wa-link.page';
import { Title } from '@angular/platform-browser';

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
    private valueChangesService: ValueChangesService,
    public toastController: ToastController,
    private localStorageService: LocalStorageService,
    private titleService: Title
  ) {
    this.shareMyLink = window.location.href;
    this.route.queryParams.subscribe((params) => {
      this.username = params.username;
    });
    this.route.params.subscribe((params) => {
      this.userId = params.user;
    });
    this.valueChangesService.menuValueChanges.subscribe((val) => {
      switch (val) {
        case 'ADD_NEW_LINK': {
          this.addNewLink();
          break;
        }
        case 'GET_MY_QR': {
          if(this.userType !== "FREE")
            this.showQr();
          else
            this.router.navigate(['app','pricing'],{queryParams: {
              from: 'profile',
            }})
          break;
        }
        case 'ADD_QUICK_LINK': {
          this.addQuickLink();
          break;
        }
        case 'UPDATED_BIO': {
          this.getUser();
          break;
        }
        case 'UPDATE_PROFILE': {
          this.getUser();
          break;
        }
        case 'REMOVE': {
          this.deleteLinks = true;
          break;
        }
        case 'SELECT_FONTS': {
          this.openFontsModal();
          break;
        }
        case 'THEME': {
          if(this.userType === "GOLD" || this.userType === 'PLATINUM')
            this.showTheme();
          else
            this.router.navigate(['app','pricing'],{queryParams: {
              from: 'profile',
            }})
          break;
        }
        case 'ADD_WHATSAPP_LINK': {
          if(this.userType !== "FREE")
            this.addWaQuickLink();
          else
            this.router.navigate(['app','pricing'],{queryParams: {
              from: 'profile',
            }})
          break;
        }
        case 'LOGOUT': {
          this.localStorageService.removeItem('username');
          this.isLoggedIn =
            this.localStorageService.getItem('username') !== null
              ? true
              : false;
          break;
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
  quickLinks: any = [];
  userId: string = '';
  shareMyLink: string = '';
  noUserFound: string = 'inprogress';
  removeLinks: boolean = false;
  isLoggedIn: boolean = false;
  theme: any;
  deleteLinks: boolean = false;
  userType: string = "FREE"
  ngOnInit() {
    if (this.localStorageService.getItem('username') == this.userId) {
      this.isLoggedIn =
        this.localStorageService.getItem('username') !== null ? true : false;
    }
    
    this.titleService.setTitle("Lincit (beta) - "+this.userId);
    this.getUser();
    // this.openFontsModal();
  }

  ionViewWillEnter() {}
  getUser() {
    this.linkService.getUser(this.userId);
    this.linkService.subject$.subscribe((res: User) => {
      console.log(res);
      if (res != null) {
        this.noUserFound = 'userfound';
        this.updatedUserData = res;
        this.links = res['link'] != undefined ? res['link'] : [];
        this.name = res['name'];
        this.bio = res['bio'];
        this.quickLinks = res['quickLink'] != undefined ? res['quickLink'] : [];
        this.dpPath = res['dpPath'];
        this.theme = res['colors'];
        this.userType = res['userType'];
      } else {
        this.noUserFound = 'usernotfound';
      }
    });
  }

  async showQr() {
    const modal = await this.modalController.create({
      component: ShowQrPage,
      cssClass: 'qr-modal',
      backdropDismiss: true,
      componentProps:{ 
        theme:this.theme,
        imageUrl: this.dpPath,
        Username: this.name
      }
    });
    modal.onDidDismiss().then(async (data: any) => {});
    return await modal.present();
  }

  async showTheme() {
    const modal = await this.modalController.create({
      component: ThemePage,
      cssClass: 'qr-modal',
      backdropDismiss: true,
      componentProps: {
        colors: this.theme,
      },
    });
    modal.onDidDismiss().then(async (data: any) => {
      console.log(data);

      this.updatedUserData['colors'] = data.data;
      this.linkService.update(this.name, this.updatedUserData);
      this.getUser();
    });
    return await modal.present();
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

  async addQuickLink() {
    const modal = await this.modalController.create({
      component: QuickLinkModalPage,
      cssClass: 'newQuickLinkModal',
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(async (data: any) => {
      this.quickLinks.push(data.data.newLink);
      this.updatedUserData['quickLink'] = this.quickLinks;
      this.linkService.update(this.name, this.updatedUserData);
    });
    return await modal.present();
  }

  async addWaQuickLink() {
    const modal = await this.modalController.create({
      component: WaLinkPage,
      cssClass: 'newLinkModal',
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(async (data: any) => {
      this.quickLinks.push(data.data.newLink);
      this.updatedUserData['quickLink'] = this.quickLinks;
      this.linkService.update(this.name, this.updatedUserData);
    });
    return await modal.present();
  }

  openLink(link: string, index?: number, linkFrom?: string) {
    if (this.deleteLinks) {
      if (linkFrom === 'QUICK_LINK') {
        this.quickLinks.splice(index, 1);
        this.updatedUserData['quickLink'] = this.quickLinks;
        this.linkService.update(this.name, this.updatedUserData);
      } else {
        this.links.splice(index, 1);
        this.updatedUserData['link'] = this.links;
        this.linkService.update(this.name, this.updatedUserData);
      }
      console.log('delete links', index);
    } else {
      this.document.location.href = link;
    }
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
  }

  async linkCopied() {
    const toast = await this.toastController.create({
      message: 'Link copied to clipboard.',
      duration: 2000,
    });
    toast.present();
  }

  async openFontsModal() {
    const modal = await this.modalController.create({
      component: FontsModalPage,
      // cssClass: 'newLinkModal',
      backdropDismiss: true,
    });
    modal.onDidDismiss().then(async (data: any) => {
      this.quickLinks.push(data.data.newLink);
      this.updatedUserData['quickLink'] = this.quickLinks;
      this.linkService.update(this.name, this.updatedUserData);
    });
    return await modal.present();
  }
}
