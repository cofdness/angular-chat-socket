import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, ApolloLink, split} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {HttpHeaders} from '@angular/common/http';
import {serverUri, socketUri} from '../config.service';
import {WebSocketLink} from './wsLink';
import {getMainDefinition} from '@apollo/client/utilities';

const uri = `${serverUri}/graphql`;
const graphqlSubUri = `${socketUri}/subscriptions`;
export const createApollo = (httpLink: HttpLink): ApolloClientOptions<any> => {
  const http = httpLink.create({uri});
  const wss = new WebSocketLink({
    url: graphqlSubUri,
    lazyCloseTimeout: 50000,
    retryAttempts: Infinity,
    lazy: false,
    on: {
      connected: () => console.log('graphql-ws connected'),
      error: (err) => console.log(err)
    }
  });
  const middleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token') || null}`
      )
    });
    return forward(operation);
  });

  const graphqlLink = middleware.concat(http);
  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({query}) => {
      // @ts-ignore
      const {kind, operation} = getMainDefinition(query);
      return (
        kind === 'OperationDefinition' && operation === 'subscription'
      );
    },
    wss,
    graphqlLink,
  );
  return {
    link,
    cache: new InMemoryCache(),
  };
};

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
