


module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define("car360", {
    name: {
      type: Sequelize.STRING,
       
    },
    manufacturer: {
      type: Sequelize.STRING,
       
    },
    year: {
      type: Sequelize.INTEGER,
       
    },
     images: {
      type: Sequelize.STRING,
      
    },
     number_of_day: {
      type: Sequelize.INTEGER,
       
    },
     amount: {
      type: Sequelize.INTEGER,
       
    }
  },
  {
    freezeTableName: true,    
  }
  );

  return Car;
};