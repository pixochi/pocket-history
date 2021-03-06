const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = require('../config/db.json')[env];
const db = {};

let sequelize;

if (dbConfig.url) {
  sequelize = new Sequelize(dbConfig.url, { dialect: dbConfig.dialect, operatorsAliases: false });
} else {
  sequelize = new Sequelize(
    dbConfig.database, dbConfig.username, dbConfig.password, dbConfig
  );
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
