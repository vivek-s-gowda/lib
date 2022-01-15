import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FontsModalPage } from './fonts-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FontsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FontsModalPageRoutingModule {}
