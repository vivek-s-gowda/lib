import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  username: string = '';
  phoneNumber: string = '';
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.username = params.username;
    });
  }

  ngOnInit() {}

  checkAndLogin() {
    this.router.navigate(['/', 'app', 'otp'], {
      queryParams: {
        from: 'create',
        username: this.username,
        phoneNumber: this.phoneNumber,
      },
    });
  }
}
