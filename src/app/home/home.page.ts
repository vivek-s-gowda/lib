import { Component } from '@angular/core';
import { LinkService } from '../services/link.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private linkService: LinkService) {
    this.linkService.getBookingList();
  }



}
