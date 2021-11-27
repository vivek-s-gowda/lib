import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  from:string;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.from = params.from;
    });
  }

  ngOnInit() {}

  createPassword() {
    if(this.from == 'create')
      this.router.navigate(['/', 'app', 'create-password']);
    else
      this.router.navigate(['/', 'viveksgowda']);
  }
}
