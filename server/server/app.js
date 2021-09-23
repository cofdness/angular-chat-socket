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
import authGraphql from "./middlewares/auth-graphql";
// config
import {env, ip, port} from './config'

//express-graphql
import {graphqlHTTP} from "express-graphql";
import {useServer} from "graphql-ws/lib/use/ws";
import schema from './graphql'

const { execute, subscribe } = require('graphql')
const ws = require('ws')

const app = express();

//graphql
app.use('/graphql', authGraphql , graphqlHTTP(req => ({
  schema: schema,
  graphiql: true,
  context: {
    isAuth: req.isAuth,
    user: req.user,
    error: req.error
  },
  customFormatErrorFn: (err) => {
    if (!err.originalError) {
      return err
    }
    /*
        You can add the following to any resolver
        const error = new Error('My message')
        error.data = [...]
        error.code = 001
    */
    const message = err.message || 'An error occured.'
    const code = err.originalError.code
    const data = err.originalError.data
    return {
      // ...err,
      message,
      code,
      data
    }
  }

})))

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

/** Create HTTP server. */
// function createHttpServer(app){
//   if (env === 'production') {
//     const sslkey = fs.readFileSync('./www/keys/ssl-key.pem')
//     const sslcert = fs.readFileSync('./www/keys/ssl-cert.pem')
//     const option = {
//       key: sslkey,
//       cert: sslcert
//     }
//     return {server: https.createServer(option, app), urlPrefix: 'https://'}
//   } else {
//     return {server: http.createServer(app), urlPrefix: 'http://'}
//   }
//
// }

const server = http.createServer(app)

/** Create socket connection */
global.io = new Server(server, {
  cors: {
    origin: '*',
    method: ['GET', 'POST']
  }
})
global.io.on('connection', WebSockets.connection)


server.listen({ip: ip, port: port}, () => {
  // new SubscriptionServer({
  //   execute, subscribe, schema,
  // },
  //   {
  //     server,
  //     path: '/subscriptions'
  //   })
  const path = '/subscriptions'
  const wsServer = new ws.Server({
    server,
    path
  });

  useServer(
    {
      schema,
      execute,
      subscribe,
      onConnect: (ctx) => {
        console.log('Connect');
      },
      onSubscribe: (ctx, msg) => {
        console.log('Subscribe');
      },
      onNext: (ctx, msg, args, result) => {
        console.debug('Next');
      },
      onError: (ctx, msg, errors) => {
        console.error('Error');
      },
      onComplete: (ctx, msg) => {
        console.log('Complete');
      },
    },
    wsServer
  );
  console.log(`Listening on server: http://${ip}:${port}`)
  console.log(`GraphQL endpoint: http://${ip}:${port}/graphql`)
  console.log(`GraphQL subscription: http://${ip}:${port}/subscriptions`)
})

// async function startServer(typeDefs, resolvers) {
//   const apolloServer = new ApolloServer({
//     typeDefs,
//     resolvers,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer: server })],
//   });
//   /** Listen on provided port, on all network interfaces. */
//   await apolloServer.start();
//   apolloServer.applyMiddleware({ app });
//   await new Promise(resolve => server.listen({ip: ip, port: port }, resolve));
//   /** Event listener for HTTP server "listening" event. */
//   console.log(`Listening on server: ${urlPrefix}${ip}:${port}/ and path graphql is ${apolloServer.graphqlPath}`)
// }
//
//
// startServer(typeDefs, resolvers).catch(err => console.log(err))
