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
  links = [
    {
      imageUrl:
        'https://lh3.googleusercontent.com/-169teTA_3vI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck8Hcd40DI7czgwOv2JRdXZVtqptw/photo.jpg?sz=46',
      linkName: 'Facebook',
    },
    {
      imageUrl:
        'https://lh3.googleusercontent.com/-169teTA_3vI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck8Hcd40DI7czgwOv2JRdXZVtqptw/photo.jpg?sz=46',
      linkName: 'Instagram',
    },
    {
      imageUrl:
        'https://lh3.googleusercontent.com/-169teTA_3vI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck8Hcd40DI7czgwOv2JRdXZVtqptw/photo.jpg?sz=46',
      linkName: 'check my new video',
    },
    {
      imageUrl:
        'https://lh3.googleusercontent.com/-169teTA_3vI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck8Hcd40DI7czgwOv2JRdXZVtqptw/photo.jpg?sz=46',
      linkName: 'wync',
    },
    {
      imageUrl:
        'https://lh3.googleusercontent.com/-169teTA_3vI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck8Hcd40DI7czgwOv2JRdXZVtqptw/photo.jpg?sz=46',
      linkName: 'snapchat',
    },
    {
      imageUrl:
        'https://lh3.googleusercontent.com/-169teTA_3vI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck8Hcd40DI7czgwOv2JRdXZVtqptw/photo.jpg?sz=46',
      linkName: 'youtube',
    },
    {
      imageUrl:
        'https://lh3.googleusercontent.com/-169teTA_3vI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck8Hcd40DI7czgwOv2JRdXZVtqptw/photo.jpg?sz=46',
      linkName: 'tiktok',
    },
  ];
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
    modal.onDidDismiss().then(async (data: any) => {
      console.log('the data ', data);
    });
    return await modal.present();
  }
}
