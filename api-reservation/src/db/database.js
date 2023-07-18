import { Sequelize } from 'sequelize';
import { development } from './config/credentialsDB.js';

const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: development.host,
    dialect: development.dialect,
  }
);

export default sequelize;