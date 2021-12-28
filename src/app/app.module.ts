import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GraphQLModule} from './graphql/graphql.module';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {UserListComponent} from './user-list/user-list.component';
import {HomeComponent} from './home/home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FooterComponent} from './footer/footer.component';
import {StickyHeaderComponent} from './sticky-header.component';
import { StoreModule } from '@ngrx/store';
import {BookModule} from "./book/book.module";
import {booksReducer} from "./book/books.reducer";
import {collectionReducer} from "./book/collection.reducer";

@NgModule({
  declarations: [
    AppComponent,
    StickyHeaderComponent,
    ThemeSwitchComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    HomeComponent,
    FooterComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GraphQLModule,
    FlexLayoutModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MaterialModule,
    BookModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ books: booksReducer, collection: collectionReducer}, {}),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
