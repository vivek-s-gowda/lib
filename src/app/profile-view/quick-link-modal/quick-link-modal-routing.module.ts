import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuickLinkModalPage } from './quick-link-modal.page';

const routes: Routes = [
  {
    path: '',
    component: QuickLinkModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuickLinkModalPageRoutingModule {}
