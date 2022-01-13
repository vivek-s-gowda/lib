import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { getAuth } from 'firebase/auth';
import firebase from '@firebase/app-compat';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  from: string;
  otp: string;
  username: string = '';
  phoneNumber: string = '';
  reCaptchaVerifier;
  auth = getAuth();
  otpConfirmation: firebase.default.auth.ConfirmationResult;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public toastController: ToastController
  ) {
    this.route.queryParams.subscribe((params) => {
      this.from = params.from;
      this.username = params.username;
      this.phoneNumber = params.phoneNumber;
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container'
    );
    firebase
      .auth()
      .signInWithPhoneNumber('+91' + this.phoneNumber, this.reCaptchaVerifier)
      .then((data) => {
        this.otpConfirmation = data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async createPassword() {
    try {
      this.otpConfirmation
        .confirm(this.otp)
        .then((result) => {
          console.log(result);
          if (this.from == 'create') {
            this.router.navigate(['/', 'app', 'create-password'], {
              queryParams: {
                username: this.username,
                phoneNumber: this.phoneNumber,
              },
            });
          } else if (this.from == 'login') {
            localStorage.setItem('isLinkInBioLoggedIn', 'yes');
            this.router.navigate(['/', this.username], {
              queryParams: { username: this.username },
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'OTP error ',
        duration: 2000,
      });
      toast.present();
    }
  }

  ionViewDidLeave() {}
}
