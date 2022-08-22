require("dotenv").config();
const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

const db = {};

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dataString: "date",
});

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;
