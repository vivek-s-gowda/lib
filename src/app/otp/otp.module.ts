import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpPageRoutingModule } from './otp-routing.module';

import { OtpPage } from './otp.page';
import { CodeInputModule } from 'angular-code-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpPageRoutingModule,
    CodeInputModule
  ],
  declarations: [OtpPage]
})
export class OtpPageModule {}
