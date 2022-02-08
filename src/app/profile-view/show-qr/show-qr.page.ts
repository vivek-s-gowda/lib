import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-qr',
  templateUrl: './show-qr.page.html',
  styleUrls: ['./show-qr.page.scss'],
})
export class ShowQrPage implements OnInit {
  @Input() url: string = window.location.href
  margin: number = 4
  constructor() { }

  ngOnInit() {
  }

}
