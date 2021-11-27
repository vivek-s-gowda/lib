import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import firebase from '@firebase/app-compat';
import 'firebase/auth';
import { environment } from 'src/environments/environment';
firebase.initializeApp(environment.firebaseConfig);

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  auth = getAuth();
  otpSent: boolean = false;
  reCaptchaVerifier;
  otpConfirmation: firebase.default.auth.ConfirmationResult;
  phoneNumber: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container'
    );
  }

  ionViewDidLoad() {
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container'
    );
  }

  checkAndLogin() {
    firebase
      .auth()
      .signInWithPhoneNumber('+91' + this.phoneNumber, this.reCaptchaVerifier)
      .then((data) => {
        console.log(data);
        this.router.navigate(['/', 'app', 'otp'], {
          queryParams: { from: 'login' },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
