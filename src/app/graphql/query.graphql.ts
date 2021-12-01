import {gql} from 'apollo-angular';

export const queryGraphql = {
  currentUser : gql`
    query User {
      user {
        name
        email
        picture
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
  users: gql`
    query Users {
        users {
          id
          name
          picture
        }
    }
  `
};
