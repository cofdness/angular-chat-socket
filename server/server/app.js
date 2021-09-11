import http from "http";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import {errorHandler as queryErrorHandler} from 'querymen'
import {errorHandler as bodyErrorHandler} from 'bodymen'
import { Server } from 'socket.io'
// mongo connection
import "./mongo";
// socket configuration
import WebSockets from "./utils/WebSockets.js";
// routes
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import chatRoomRouter from "./routes/chatRoom.js";
import deleteRouter from "./routes/delete.js";
// middlewares
import { decode } from './middlewares/jwt.js'
// config
import {env, ip, port} from './config'
import fs from "fs";
import https from "https";

//apollo server
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

const app = express();

/** Get port from environment and store in Express. */
app.set("port", port);

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(queryErrorHandler())
app.use(bodyErrorHandler())

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

// /** catch 404 and forward to error handler */
// app.use('*', (req, res, next) => {
//   console.log(`req.url: ${req.url}`)
//   if (req.url === '/') return next()
//   return res.status(404).json({
//     success: false,
//     message: 'API endpoint doesnt exist'
//   })
// });

/** Create HTTP server. */
let server

if (env === 'production') {
  const sslkey = fs.readFileSync('./www/keys/ssl-key.pem')
  const sslcert = fs.readFileSync('./www/keys/ssl-cert.pem')
  const option = {
    key: sslkey,
    cert: sslcert
  }
  server = https.createServer(option, app)
} else {
  server = http.createServer(app)
}
/** Create socket connection */
global.io = new Server(server, {
  cors: {
    origin: '*',
    method: ['GET', 'POST']
  }
})
global.io.on('connection', WebSockets.connection)

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

async function startServer(typeDefs, resolvers) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: server })],
  });
  /** Listen on provided port, on all network interfaces. */
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  await new Promise(resolve => server.listen({ip: ip, port: port }, resolve));
  /** Event listener for HTTP server "listening" event. */
  console.log(`Listening on server: http://${ip}:${port}/ and path graphql is ${apolloServer.graphqlPath}`)
}


startServer(typeDefs, resolvers).catch(err => console.log(err))
