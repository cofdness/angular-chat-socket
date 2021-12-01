import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {UserComponent} from './user/user.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {MaterialModule} from '../material/material.module';
import {FriendsComponent} from './friends/friends.component';


@NgModule({
  declarations: [
    UserComponent,
    UserInfoComponent,
    FriendsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ]
})
export class UserModule { }
