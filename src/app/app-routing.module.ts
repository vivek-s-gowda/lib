import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'app/login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'app/otp',
    loadChildren: () => import('./otp/otp.module').then((m) => m.OtpPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'app/create-password',
    loadChildren: () =>
      import('./create-password/create-password.module').then(
        (m) => m.CreatePasswordPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: ':user',
    loadChildren: () =>
      import('./profile-view/profile-view.module').then(
        (m) => m.ProfileViewPageModule
      ),
  },
  {
    path: 'app/create-account',
    loadChildren: () =>
      import('./create-account/create-account.module').then(
        (m) => m.CreateAccountPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'app/add-link-modal',
    loadChildren: () =>
      import('./add-link-modal/add-link-modal.module').then(
        (m) => m.AddLinkModalPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-popup',
    loadChildren: () =>
      import('./edit-popup/edit-popup.module').then(
        (m) => m.EditPopupPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'app/pricing',
    loadChildren: () => import('./pricing/pricing.module').then( m => m.PricingPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
