import { Sequelize } from "sequelize";

const db = new Sequelize('ts-restserver', 'apiuser', 'M3E6e26bjHsZWzbn', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true,
});

export default db;