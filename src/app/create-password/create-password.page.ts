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
  ngOnInit() {}

  enterIntoProfile() {
    this.createUser();
  }

  createUser() {
    this.addUser.key = Math.random().toString();
    this.addUser.name = this.username;
    this.addUser.dpPath = '';
    this.addUser.phoneNumber = this.phoneNumber;
    this.addUser.bio = '';
    this.addUser.link = [
      {
        imageUrl:
          'https://lh3.googleusercontent.com/-169teTA_3vI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck8Hcd40DI7czgwOv2JRdXZVtqptw/photo.jpg?sz=46',
        linkUrl: 'https://google.com',
        linkName: 'Facebook',
      },
    ];
    this.addUser.theme = 'default';
    this.linkService.create(this.phoneNumber, this.addUser).then(() => {
      console.log('Created new item successfully!');
      this.router.navigate(['/', 'viveksgowda'], {
        queryParams: { username: this.username },
      });
    });
  }
}
