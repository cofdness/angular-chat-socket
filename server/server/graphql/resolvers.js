import books from './book'
const resolvers = {
  Query: {
    books: () => books,
  },
};
export default resolvers
