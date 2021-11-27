import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.page.html',
  styleUrls: ['./create-password.page.scss'],
})
export class CreatePasswordPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  enterIntoProfile() {
    this.router.navigate(['/', 'viveksgowda']);
  }
}
