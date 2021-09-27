import gql from "graphql-tag";
const userTypes = gql`
  type User {
    id: ID
    name: String
    email: String
    password: String
    picture: String
    role: roles
  }
  type Token {
    token: String
  }
  input UserLogin {
    email: String!
    password: String!
  }
  input UserMutation {
    name: String
    email: String!
    password: String!
    role: roles
  }

  enum roles {
    admin, support, customer
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }
  type Mutation {
    login(input: UserLogin!): Token
    createUser(input: UserMutation): User
    updateUser(input: UserMutation): User
    deleteUser(input: UserMutation): User
  }
  `
export default userTypes
