import {gql} from 'apollo-angular';

export const subscriptionGraphql = {
  somethingChanged: gql`
    subscription onSomethingChanged {
      somethingChanged {
        id
      }
    }
  `,
  newUserEvent: gql`
    subscription onNewUserEvent {
      newUserEvent {
        id
        name
        picture
      }
    }
  `
};
