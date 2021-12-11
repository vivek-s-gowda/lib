import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPopupPage } from './edit-popup.page';

const routes: Routes = [
  {
    path: '',
    component: EditPopupPage
  },
  {
    path: 'image-crop',
    loadChildren: () => import('./image-crop/image-crop.module').then( m => m.ImageCropPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPopupPageRoutingModule {}
