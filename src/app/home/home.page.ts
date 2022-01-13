import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LinkService } from '../services/link.service';
import { map } from 'rxjs/operators';
import User from '../model/data.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: User = new User();
  username: string = '';
  usernameNotAvailable: boolean = false;
  userLink: string = '';
  constructor(private linkService: LinkService, private router: Router) {}

  checkAndLogin() {
    this.router.navigate(['/', 'app', 'login']);
  }

  showUsernameUrl(event) {
    if (this.username != '') {
      this.userLink = 'lincinbio.com/' + event.target.value;
      this.usernameNotAvailable = false;
    }
  }

  createAccount() {
    this.linkService.getUser(this.username);
    this.linkService.subject$.subscribe((res) => {
      if (res == null) {
        this.usernameNotAvailable = false;
        this.router.navigate(['/', 'app', 'create-account'], {
          queryParams: { username: this.username },
        });
      } else {
        this.usernameNotAvailable = true;
      }
    });
  }
}
