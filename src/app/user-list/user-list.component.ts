import {Component, OnInit} from '@angular/core';
import {Apollo, QueryRef} from 'apollo-angular';
import {catchError, Observable, of} from 'rxjs';
import {queryGraphql} from '../graphql/query.graphql';
import {subscriptionGraphql} from '../graphql/subscription.graphql';
import {ApolloQueryResult, NetworkStatus} from "@apollo/client";
import {UserQuery} from "../model/user-query.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

   emptyUser = {
    data: {
      users : [{
        id: '',
        name: '',
        picture: '',
        email: ''
      }]
    },
    loading: false,
    networkStatus: NetworkStatus.error
  }

  // fetch user list, live update if new user create.
  usersQuery: QueryRef<UserQuery>
  users:  ApolloQueryResult<UserQuery> = this.emptyUser;
  constructor(private apollo: Apollo) {
    this.usersQuery = apollo.watchQuery<UserQuery>({
      query: queryGraphql.users
    })
    this.usersQuery.valueChanges.subscribe({
      next: response => {
        this.users = response;
      }
    })
  }

  ngOnInit() {
    this.usersQuery.subscribeToMore({
      document: subscriptionGraphql.newUserEvent,
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data) {
          return prev;
        }
        return {
          ...prev,

          users: [subscriptionData.data.newUserEvent, ...prev.users]
        };
      }
    });
  }

}
