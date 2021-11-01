import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AuthGuard} from './auth/auth.guard';
import {SelectivePreloadingStrategyService} from './selective-preloading-strategy.service';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canLoad: [AuthGuard]}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: SelectivePreloadingStrategyService })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
