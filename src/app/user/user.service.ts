import { Injectable } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Apollo, gql} from "apollo-angular";
import {Observable} from "rxjs";
import {User, UserInput} from "./user";
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
        // this.authService.isLoggedIn = true;
        // @ts-ignore
      return this.authService.user = data.user as User;
      }
    ));
  }

  createUser({email, password, role = 'consumer'}): Observable<User> {
    const createUser = gql`
        mutation CreateUser($email: String!, $password: String!, $role: String) {
          createUser(input: {
            email: $email
            password: $password
            role: $role
          }){
            email
            name
            picture
            accessToken {
              token
            }
          }
        }
    `;
    return this.apollo.mutate({
      mutation: createUser,
      variables: {
        email,
        password,
        role
      }
    }).pipe(map(({data}) =>
      // @ts-ignore
       data.createUser as User
    ));
  }
}
