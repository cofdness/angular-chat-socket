import {gql} from 'apollo-angular';

export const mutationGraphql = {
  login: gql`
    mutation Login($email: String!, $password: String!) {
      login(input: {
        email: $email,
        password: $password
      }){
        email
        name
        picture
        accessToken {
          token
        }
      }
    }
  `,
  createUser : gql`
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
  `
};
