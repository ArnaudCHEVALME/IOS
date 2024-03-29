module.exports = (sequelize, DataTypes) => {
  return sequelize.define('meeting_spots', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
};