const { DataTypes } = require("sequelize");


module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define("cars", {
    name: {
      type: Sequelize.STRING,
       allowNull: false,
    },
    manufacturer: {
      type: Sequelize.STRING,
       allowNull: false,
    },
    yaer: {
      type: Sequelize.STRING,
       allowNull: false,
    },
     images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
     number_of_days: {
      type: Sequelize.REAL,
       allowNull: false,
    },
     amount: {
      type: Sequelize.INTEGER,
       allowNull: false,
    }
  });

  return Car;
};