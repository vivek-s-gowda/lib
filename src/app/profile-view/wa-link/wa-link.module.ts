import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaLinkPageRoutingModule } from './wa-link-routing.module';

import { WaLinkPage } from './wa-link.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaLinkPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [WaLinkPage]
})
export class WaLinkPageModule {}
