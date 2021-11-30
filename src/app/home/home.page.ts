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
  username:string = "";
  constructor(private linkService: LinkService, private router: Router) {
    // this.linkService.getBookingList();
    // this.linkService.deleteAll();
    // this.saveData();
    // this.retrieveData();
  }

  checkAndLogin() {
    this.router.navigate(['/', 'app', 'login']);
  }

  createAccount() {
    this.router.navigate(['/', 'app', 'create-account'],{queryParams:{username:this.username}});
  }

  retrieveData(): void {
    this.linkService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        // this.tutorials = data;
        console.log(data);
      });
  }

  saveData(): void {
    this.data = {
      key: 'sgowdavivek',
      name: 'Vivek S',
      bio: 'Check out me below',
      link: [
        {
          img: 'img path',
          link: 'gggggggg',
        },
        {
          img: 'img path',
          link: 'gggggggg',
        },
      ],
    };

    this.linkService.create('',this.data).then(() => {
      console.log('Created new item successfully!');
    });
  }
}
