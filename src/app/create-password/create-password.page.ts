import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../model/data.model';
import { LinkService } from '../services/link.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.page.html',
  styleUrls: ['./create-password.page.scss'],
})
export class CreatePasswordPage implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private linkService: LinkService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.username = params.username;
      this.phoneNumber = params.phoneNumber;
    });
  }
  username: string = '';
  phoneNumber: string = '';
  addUser: User = new User();
  password: string;
  confirmPassword: string;
  passwordMatch: boolean = true;
  ngOnInit() {}

  enterIntoProfile() {
    this.createUser();
  }

  getPasswordMatch() {
    this.passwordMatch = this.password === this.confirmPassword ? false : true;
  }

  createUser() {
    localStorage.setItem(this.username, 'true');
    localStorage.setItem('password', this.password);
    this.addUser.key = Math.random().toString();
    this.addUser.name = this.username;
    this.addUser.dpPath = '';
    this.addUser.phoneNumber = this.phoneNumber;
    this.addUser.bio = '';
    this.addUser.link = [];
    this.addUser.quickLink = [];
    this.addUser.theme = 'default';
    this.linkService.create(this.username, this.addUser).then(() => {
      console.log('Created new item successfully!');
      this.router.navigate(['/', this.username], {
        queryParams: { username: this.username },
      });
    });
  }
}
