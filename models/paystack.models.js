


module.exports = (sequelize, Sequelize) => {
  const Paystack = sequelize.define("paystack", {
    full_name: {
      type: Sequelize.STRING,       
    },

    email: {
      type: Sequelize.STRING,       
    },

     amount: {
      type: Sequelize.INTEGER,       
    },
    reference: {
        type: Sequelize.STRING,
    },
    }, 
     {
         freezeTableName: true,    
     }
  );

  return Paystack;
};