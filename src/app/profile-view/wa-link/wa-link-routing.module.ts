import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaLinkPage } from './wa-link.page';

const routes: Routes = [
  {
    path: '',
    component: WaLinkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaLinkPageRoutingModule {}
