import gql from "graphql-tag";
const userTypes = gql`
  type User {
    name: String
    email: String
    password: String
    picture: String
    role: String
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
    role: String
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
