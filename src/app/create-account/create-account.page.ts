import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LinkService } from '../services/link.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  username: string = '';
  phoneNumber: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private linkService: LinkService,
    public toastController: ToastController
  ) {
    this.route.queryParams.subscribe((params) => {
      this.username = params.username;
    });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    // this.linkService.subject$.unsubscribe();
  }


  checkAndLogin() {
    this.linkService.verifyNumber(this.phoneNumber)
    this.linkService.numberExists$.subscribe(async (value) => {
      if (!value) {
        this.router.navigate(['/', 'app', 'otp'], {
          queryParams: {
            from: 'create',
            username: this.username,
            phoneNumber: this.phoneNumber,
          },
        });
      } else {
        const toast = await this.toastController.create({
          message: 'Phone number already in use.',
          duration: 2000,
        });
        toast.present();
      }
    });
  }

  ionViewDidLeave()
  {
    this.linkService.numberExists$.unsubscribe();
  }
}
