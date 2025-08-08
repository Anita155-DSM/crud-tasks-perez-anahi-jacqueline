import { Sequelize } from "sequelize";
import dotenv from 'dotenv';  //correccion 
import MysqlDialect from "sequelize/lib/dialects/mysql/index";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME, //ordeno mejor esto, sino es un poco confuso
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT //correccion
  }
);
