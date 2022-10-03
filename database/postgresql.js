const dbConfig = require("../config/db.config");
const pg = require('pg');
pg.defaults.ssl = true;
const Sequelize = require("sequelize");



const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
               ssl: {
                    require: true,
                    rejectUnauthorized: false
                  }
          }
  // declaring pool is optional
  // pool: {
//   max: dbConfig.pool.max,
//   min: dbConfig.pool.min,
//   acquire: dbConfig.pool.acquire,
//   idle: dbConfig.pool.idle
// }

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.car = require("../models/carpostres.model")(sequelize, Sequelize);

module.exports = db;