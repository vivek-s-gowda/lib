import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show-qr',
  templateUrl: './show-qr.page.html',
  styleUrls: ['./show-qr.page.scss'],
})
export class ShowQrPage implements OnInit {
  @Input() url: string = window.location.href;
  margin: number = 4;
  constructor(private modal: ModalController) {}

  ngOnInit() {}

  dissmiss() {
    this.modal.dismiss()
  }

}
