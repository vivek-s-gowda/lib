import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLinkModalPage } from './add-link-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddLinkModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLinkModalPageRoutingModule {}
