import express from 'express';
import dotenv from 'dotenv';
import './models/userModel.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config();

import routes from './routes/userRoute.js';

const app = express();
const port = process.env.SERVER_PORT || 3001;

const option = {
  socketTimeoutMS: 30000,
};

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, option).then(() =>{
  console.log('Connected to MongoDB');
}, (err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

routes(app);

app.use((req, res) => {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

app.listen(port);

console.log('RESTful API server started on: ' + port);

export default app;
