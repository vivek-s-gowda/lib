import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FontsModalPageRoutingModule } from './fonts-modal-routing.module';

import { FontsModalPage } from './fonts-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontsModalPageRoutingModule
  ],
  declarations: [FontsModalPage]
})
export class FontsModalPageModule {}
