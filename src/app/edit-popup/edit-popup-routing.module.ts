import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPopupPage } from './edit-popup.page';

const routes: Routes = [
  {
    path: '',
    component: EditPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPopupPageRoutingModule {}
