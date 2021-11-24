import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
})
export class ProfileViewPage implements OnInit {

  constructor() { }

  editView:boolean = false;
  ngOnInit() {
  }

  editProfile()
  {
    this.editView = !this.editView;
  }
}
