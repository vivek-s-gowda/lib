import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileViewPage } from './profile-view.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileViewPage
  },
  {
    path: 'show-qr',
    loadChildren: () => import('./show-qr/show-qr.module').then( m => m.ShowQrPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileViewPageRoutingModule {}
