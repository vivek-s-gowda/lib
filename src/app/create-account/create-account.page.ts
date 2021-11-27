import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  checkAndLogin() {
    this.router.navigate(['/', 'app', 'otp'],{
      queryParams: { from: 'create' }
    });
  }
}
