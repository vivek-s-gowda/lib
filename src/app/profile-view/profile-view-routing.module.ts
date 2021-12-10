import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ProfileViewPage } from './profile-view.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileViewPage,
  },
  {
    path: 'show-qr',
    loadChildren: () =>
      import('./show-qr/show-qr.module').then((m) => m.ShowQrPageModule),
  },
  {
    path: 'quick-link-modal',
    loadChildren: () =>
      import('./quick-link-modal/quick-link-modal.module').then(
        (m) => m.QuickLinkModalPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), DragDropModule, ClipboardModule],
  exports: [RouterModule, DragDropModule, ClipboardModule],
})
export class ProfileViewPageRoutingModule {}
