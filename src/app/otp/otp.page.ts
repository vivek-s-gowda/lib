import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.from = params.from;
      this.username = params.username;
      this.phoneNumber = params.phoneNumber;
    });
  }

  ngOnInit() {}

  createPassword() {
    // this.otpConfirmation.confirm(this.otp).then((result) => {
    //   // User signed in successfully.
    //   console.log(result);
    //   const user = result.user;
    //   // ...
    // }).catch((error) => {
    //   // User couldn't sign in (bad verification code?)
    //   // ...
    // });
    if (this.from == 'create')
      this.router.navigate(['/', 'app', 'create-password'], {
        queryParams: { username: this.username, phoneNumber: this.phoneNumber },
      });
    else this.router.navigate(['/', 'viveksgowda']);
  }
}
