const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.IOS_POSTGRES_DB,
  process.env.IOS_POSTGRES_USER,
  process.env.IOS_POSTGRES_PASSWORD,
  {
    host: process.env.IOS_POSTGRES_HOST,
    dialect: 'postgres',
    define: {
      timestamps: false,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    freezeTableName: true,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require('./users.model.js')(sequelize, DataTypes)
db.MeetingSpot = require('./meeting_spots.model.js')(sequelize, DataTypes)

// db.Presences = require('./presences.model.js')(sequelize, DataTypes)

db.Users.belongsToMany(db.MeetingSpot, {
  through: 'presences',
  foreignKey: 'user_id',
  otherKey: 'company_id'
})
db.MeetingSpot.belongsToMany(db.Users, {
  through: 'presences',
  foreignKey: 'company_id',
  otherKey: 'user_id'
})

module.exports = db;