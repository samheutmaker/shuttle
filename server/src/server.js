import express from 'express'
import mongoose from 'mongoose'
import redis from './redis'
import Token from './models/Token'
import userRoutes from './routes/user-routes'
import tokenRoutes from './routes/token-routes'
import {
  MONGO_DB_URL,
  HTTP_PORT
} from './env'


// Redis
((async () => {
  let tokens = await Token.find();
  tokens.forEach(token => {
    redis.set(token.token, token.ownerId);
  });
})())

mongoose.connect(MONGO_DB_URL);
const app = express();
app.use('/auth', userRoutes);
app.use('/token', tokenRoutes);

function start() {
  return new Promise((resolve) => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server live on port ${HTTP_PORT}`);
      resolve();
    })
  });
}

function stop() {
  return new Promise((resolve, reject) => {
    app.close();
    resolve();
  })
}

export {
  start,
  stop,
}