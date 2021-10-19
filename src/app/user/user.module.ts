import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {UserComponent} from './user/user.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {MaterialModule} from '../material/material.module';


@NgModule({
  declarations: [
    UserComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ]
})
export class UserModule { }
