import {gql} from 'apollo-angular';
import {User} from "../user/user";

export const queryGraphql = {
  currentUser : gql`
    query User {
      user {
        id
        name
        email
        picture
        friends {
          id
          name
          picture
        }
      }
    }
  `,
  userById: gql`
    query User($id: String) {
      user(id: $id) {
        name
        email
        picture
      }
    }
  `,
  users: gql<{users: User}, null>`
    query Users {
        users {
          id
          name
          picture
        }
    }
  `
};
