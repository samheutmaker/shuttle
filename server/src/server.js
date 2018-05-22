import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/user-routes'
import {
  MONGO_DB_URL,
  HTTP_PORT
} from './env'

mongoose.connect(MONGO_DB_URL);
const app = express();

app.use('/auth', userRoutes);

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