import { Injectable } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Apollo, gql} from "apollo-angular";
import {Observable} from "rxjs";
import {User} from "./user";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authService: AuthService,
    private apollo: Apollo
  ) { }

  getUser(): Observable<User>{
    const user = gql`
      query User {
        user {
          name
          email
          picture
        }
      }
    `;

    return this.apollo.query({
      query: user
    }).pipe(map(({data}) => {
        this.authService.isLoggedIn = true;
        // @ts-ignore
      return this.authService.user = data.user as User;
      }
    ));
  }
}
