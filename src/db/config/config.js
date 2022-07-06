const dotenv = require('dotenv');

dotenv.config();

const dev = {
  username: 'root',
  password: null,
  database: 'nodejs_dev',
  host: '127.0.0.1',
  dialect: 'mysql',
};

const test = {
  username: 'root',
  password: null,
  database: 'nodejs_test',
  host: '127.0.0.1',
  dialect: 'mysql',
};

const prod = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOSTNAME,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql',
};

module.exports = {
  dev,
  test,
  prod,
};
