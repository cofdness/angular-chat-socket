import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Apollo} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {InMemoryCache} from "@apollo/client";
import {HttpClientModule} from "@angular/common/http";

const uri = 'http://192.168.31.74/graphql'

@NgModule({
  exports: [HttpClientModule]
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    // create Apollo
    apollo.create({
      link: httpLink.create({uri}),
      cache: new InMemoryCache()
    });
  }
}
