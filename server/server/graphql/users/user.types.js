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
    auth(input: UserLogin!): String
    users: [User]
    user(id: ID!): User
  }
  type Mutation {
    createUser(input: UserMutation): User
    updateUser(input: UserMutation): User
    deleteUser(input: UserMutation): User
  }
  `
export default userTypes
