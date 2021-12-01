import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { User } from './user';
import { map } from 'rxjs/operators';
import { queryGraphql } from '../graphql/query.graphql';
import {mutationGraphql} from '../graphql/mutation.graphql';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAppUrlOpen = false;
  constructor(
    private authService: AuthService,
    private apollo: Apollo
  ) { }

  getCurrentUser(): Observable<User>{

    return this.apollo.query({
      query: queryGraphql.currentUser
    }).pipe(map(({data}) => {
        this.authService.isLoggedIn$.next(true);
        // @ts-ignore
        const user: User = data.user as User;
        this.authService.user$.next(user);
        return user;
  }));
  }

  createUser({email, password, role = 'consumer'}): Observable<User> {
    return this.apollo.mutate({
      mutation: mutationGraphql.createUser,
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
