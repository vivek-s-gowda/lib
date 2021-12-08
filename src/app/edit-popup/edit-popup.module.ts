import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPopupPageRoutingModule } from './edit-popup-routing.module';

import { EditPopupPage } from './edit-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPopupPageRoutingModule
  ],
  declarations: [EditPopupPage]
})
export class EditPopupPageModule {}
