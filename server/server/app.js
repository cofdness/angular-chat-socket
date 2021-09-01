import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";
import { Server } from 'socket.io'
// mongo connection
import "./mongo/mongo.js";
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

const app = express();

/** Get port from environment and store in Express. */
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

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
/** Listen on provided port, on all network interfaces. */
server.listen(port, ip);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://${ip}:${port}/`)
});
