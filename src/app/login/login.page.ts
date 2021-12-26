import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import firebase from '@firebase/app-compat';
import 'firebase/auth';
import { environment } from 'src/environments/environment';
import { LinkService } from '../services/link.service';
import User from '../model/data.model';
import { Subscription } from 'rxjs';
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
  username: string = '';
  noUserFound: string = '';
  userPhonenumber: string = '';
  getLoginInfo: Subscription;

  constructor(private router: Router, private linkService: LinkService) {}

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
    this.linkService.getUser(this.username);
    this.getLoginInfo = this.linkService.subject$.subscribe((res: User) => {
      if (res != null) {
        this.userPhonenumber = res['phoneNumber'];
        this.router.navigate(['/', 'app', 'otp'], {
          queryParams: {
            from: 'login',
            phoneNumber: this.userPhonenumber,
            username: this.username,
          },
        });
      } else {
        this.noUserFound = 'usernotfound';
      }
    });
    //   firebase
    //     .auth()
    //     .signInWithPhoneNumber('+91' + this.phoneNumber, this.reCaptchaVerifier)
    //     .then((data) => {
    //       console.log(data);
    //       this.router.navigate(['/', 'app', 'otp'], {
    //         queryParams: { from: 'login' },
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  }

  ionViewDidLeave() {
    if (this.getLoginInfo != undefined) this.getLoginInfo.unsubscribe();
  }
}
