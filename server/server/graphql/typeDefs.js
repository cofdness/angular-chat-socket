const gql = require('graphql-tag')

const typeDefs = gql`

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`
export default typeDefs
