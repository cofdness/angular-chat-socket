import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {GraphQLModule} from "./graphql/graphql.module";
import {MaterialModule} from "./material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NavbarComponent} from "./navbar/navbar.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {StickyHeaderComponent} from "./sticky-header.component";
import {ThemeSwitchComponent} from "./theme/theme-switch/theme-switch.component";
import {StoreModule} from "@ngrx/store";
import {themeReducer} from "./theme/theme.reducer";
import {FooterComponent} from "./footer/footer.component";
import {UserListComponent} from "./user-list/user-list.component";
import {HomeComponent} from "./home/home.component";
import {booksReducer} from "./book/books.reducer";
import {collectionReducer} from "./book/collection.reducer";

@NgModule({
  declarations: [
    FooterComponent,
    ThemeSwitchComponent,
    StickyHeaderComponent,
    NavbarComponent,
    SidebarComponent,
    RegisterComponent,
    LoginComponent,
    UserListComponent,
    HomeComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({them: themeReducer, books: booksReducer, collection: collectionReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
