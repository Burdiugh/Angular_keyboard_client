import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './account/auth.guard.service';

import { LoginComponent } from './account/login/login.component';
import { ProfilePageComponent } from './account/profile-page/profile-page.component';
import { RegisterComponent } from './account/register/register.component';
import { ResetPasswordRequestComponent } from './account/reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'app-profile-page', component: ProfilePageComponent, canActivate: [AuthGuardService]},
  { path: 'account/app-reset-password-request', component: ResetPasswordRequestComponent},
  {path:'account/app-reset-password',component:ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
