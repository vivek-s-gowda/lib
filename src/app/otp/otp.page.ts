import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { getAuth } from 'firebase/auth';
import firebase from '@firebase/app-compat';
import { ToastController } from '@ionic/angular';

import { LinkService } from '../services/link.service';
import User from '../model/data.model';
import { LocalStorageService } from '../services/localstorage.service';
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
  addUser: User = new User();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public toastController: ToastController,
    private linkService: LinkService,
    private localStorageService: LocalStorageService
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
      'recaptcha-container',
      {
        size: 'invisible',
        callback: function (response) {
          // submitPhoneNumberAuth();
        },
      }
    );
    firebase
      .auth()
      .signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier)
      .then((data) => {
        this.otpConfirmation = data;
      })
      .catch(async (err) => {
        const toast = await this.toastController.create({
          message: 'Too many attempts from this number. ',
          duration: 2000,
        });
        toast.present();
      });
  }

  async createPassword() {
    try {
      this.otpConfirmation
        .confirm(this.otp)
        .then(async (result) => {
          if (this.from == 'create') {
            this.addUser.key = Math.random().toString();
            this.addUser.name = this.username;
            this.addUser.dpPath = '';
            this.addUser.userType = "FREE"
            this.addUser.createdDate = new Date().toString();
            let createdDate = new Date();
            createdDate.setMonth(createdDate.getMonth() + 1);
            this.addUser.PlanExpiresOn = new Date(createdDate).toString();
            this.addUser.isBasicUser = true;
            this.addUser.colors = {
              backgroundColor: '#ffffff',
              linkButtonColor: '#bd4b4b',
              linkButtonStrokeColor: '#bd4b4b',
              linkButtonTextColor: '#eeeeee',
              textColor: '#000000',
            };
            this.addUser.phoneNumber = this.phoneNumber;
            this.addUser.bio = '';
            this.addUser.link = [];
            this.addUser.quickLink = [];
            this.addUser.theme = 'default';
            this.linkService
              .create(this.username, this.addUser)
              .then(async () => {
                const toast = await this.toastController.create({
                  message: 'Your profile created. ',
                  duration: 2000,
                });
                toast.present();
                this.localStorageService.setItem('username', this.username);
                this.router.navigate(['/', this.username]);
              });
          } else if (this.from == 'login') {
            this.localStorageService.setItem('username', this.username);
            const toast = await this.toastController.create({
              message: 'Logged In Success. ',
              duration: 2000,
            });
            toast.present();
            this.router.navigate(['/', this.username]);
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

  onCodeChanged(code: string) {}

  onCodeCompleted(code: string) {
    this.otp = code;
  }
}
