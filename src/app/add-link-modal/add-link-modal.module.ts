import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLinkModalPageRoutingModule } from './add-link-modal-routing.module';

import { AddLinkModalPage } from './add-link-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLinkModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddLinkModalPage]
})
export class AddLinkModalPageModule {}
