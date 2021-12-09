import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrCodeModule } from 'ng-qrcode';
import { ShowQrPage } from './show-qr.page';

const routes: Routes = [
  {
    path: '',
    component: ShowQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),QrCodeModule],
  exports: [RouterModule,QrCodeModule],
})
export class ShowQrPageRoutingModule {}
