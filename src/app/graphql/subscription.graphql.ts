import {gql} from 'apollo-angular';
import {User} from "../user/user";

export const subscriptionGraphql = {
  newUserEvent: gql<{newUserEvent: User}, null>`
    subscription onNewUserEvent {
      newUserEvent {
        id
        name
        picture
      }
    }
  `
};
