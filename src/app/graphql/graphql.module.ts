import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, split} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {serverUri, socketUri} from '../config.service';
import {WebSocketLink} from './wsLink';
import {getMainDefinition} from '@apollo/client/utilities';
import { Storage } from '@capacitor/storage';
import {setContext} from '@apollo/client/link/context';
import {createHttpLink} from '@apollo/client/core';

const uri = `${serverUri}/graphql`;
const graphqlSubUri = `${socketUri}/subscriptions`;
export const createApollo = (httpLink: HttpLink): ApolloClientOptions<any> => {
  const http = createHttpLink({uri});
  const wss = new WebSocketLink({
    url: graphqlSubUri,
    lazyCloseTimeout: 50000,
    retryAttempts: Infinity,
    lazy: false,
    on: {
      connected: () => console.log('graphql-ws connected'),
      error: (err) => console.log(err)
    },
    connectionParams: async () => {
      const token = await Storage.get({key: 'token'});
      return {
        authorization: token.value ? `Bearer ${token}` : null
      };
    }
  });
  const authMiddleware = setContext(operation =>
    Storage.get({key: 'token'}).then(token => ({
        // Make sure to actually set the headers here
        headers: {
          authorization: `Bearer ${token.value}`,
        }
      }))
  );

  const graphqlLink = authMiddleware.concat(http);
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
    cache: new InMemoryCache({resultCaching: false}),
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
