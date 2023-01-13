const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

  sequelize = new Sequelize(
    // 'company_db',
    // 'root',
    // '',
    // process.env.DB_NAME,
    // process.env.DB_USER,
    // process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      database: 'company_db',
      username: 'root',
      password: null,
    }
  );

module.exports = sequelize;
