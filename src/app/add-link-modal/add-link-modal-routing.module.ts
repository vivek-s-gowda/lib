import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLinkModalPage } from './add-link-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddLinkModalPage
  },  {
    path: 'icons-modal',
    loadChildren: () => import('./icons-modal/icons-modal.module').then( m => m.IconsModalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLinkModalPageRoutingModule {}
