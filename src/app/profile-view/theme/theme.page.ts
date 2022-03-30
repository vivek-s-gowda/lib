import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
})
export class ThemePage implements OnInit {
  constructor(private modal: ModalController) {}
  backgroundColor: string;
  linkButtonColor: string;
  linkButtonStrokeColor: string;
  linkButtonTextColor: string;
  textColor: string;
  @Input() colors: any;
  ngOnInit() {}

  ionViewWillEnter() {
    if (this.colors) {
      this.backgroundColor = this.colors.backgroundColor;
      this.linkButtonColor = this.colors.linkButtonColor;
      this.linkButtonStrokeColor = this.colors.linkButtonStrokeColor;
      this.linkButtonTextColor = this.colors.linkButtonTextColor;
      this.textColor = this.colors.textColor;
    }
  }

  dissmiss() {
    this.modal.dismiss({
      backgroundColor: this.backgroundColor,
      linkButtonColor: this.linkButtonColor,
      linkButtonStrokeColor: this.linkButtonStrokeColor,
      linkButtonTextColor: this.linkButtonTextColor,
      textColor: this.textColor,
    });
  }

  save() {
    this.modal.dismiss({
      backgroundColor: this.backgroundColor,
      linkButtonColor: this.linkButtonColor,
      linkButtonStrokeColor: this.linkButtonStrokeColor,
      linkButtonTextColor: this.linkButtonTextColor,
      textColor: this.textColor,
    });
  }

  reset() {
    this.backgroundColor = '#ffffff';
    this.linkButtonColor = '#bd4b4b';
    this.linkButtonStrokeColor = '#bd4b4b';
    this.linkButtonTextColor = '#eeeeee';
    this.textColor = '#000000';
  }
}
