import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FontsModalPageRoutingModule } from './fonts-modal-routing.module';

import { FontsModalPage } from './fonts-modal.page';
import { NgxOtpModule } from 'ngx-otp';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontsModalPageRoutingModule,
    NgxOtpModule
  ],
  declarations: [FontsModalPage]
})
export class FontsModalPageModule {}
