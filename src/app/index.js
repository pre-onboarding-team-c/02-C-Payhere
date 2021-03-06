const express = require('express');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('../db/models');
const apiRouter = require('./routes');

dotenv.config();
const app = express();

db.sequelize
  .sync({ force: false }) // 개발 끝나면 false
  .then(() => console.log('db connected'))
  .catch(err => console.error('occurred error in db connecting', err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use('/api', apiRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} not found`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.json({ code: err.status, message: err.message });
});

module.exports = app;
