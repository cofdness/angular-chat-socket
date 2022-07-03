import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AuthGuard} from './auth/auth.guard';
import {SelectivePreloadingStrategyService} from './selective-preloading-strategy.service';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from './user-list/user-list.component';
import {BookModule} from './book/book.module';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path:'login/:access_token', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canLoad: [AuthGuard]},
  {path: 'user-list', component: UserListComponent},
  {path: 'books', loadChildren: () => BookModule}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: SelectivePreloadingStrategyService })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
