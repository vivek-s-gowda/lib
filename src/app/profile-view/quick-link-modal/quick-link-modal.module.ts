import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickLinkModalPageRoutingModule } from './quick-link-modal-routing.module';

import { QuickLinkModalPage } from './quick-link-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuickLinkModalPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [QuickLinkModalPage],
})
export class QuickLinkModalPageModule {}
