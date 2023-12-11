module.exports = (sequelize, DataTypes) => {
  return sequelize.define('presences', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    present: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  })
};