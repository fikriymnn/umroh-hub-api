const dotenv = require("dotenv");
dotenv.config();
// console.log(process.env.NAME_USER, process.env.PASSWORD, process.env.DB_NAME, process.env.HOST);
module.exports = {
  development: {
    username: process.env.NAME_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: "mysql",
  },
  test: {
    username: process.env.NAME_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.NAME_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: "mysql",
  },

};
