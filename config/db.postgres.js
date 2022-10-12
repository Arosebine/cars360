const db = require("../database/postgresql");


const postgresDB= async()=>{

// connect to db
    await db.sequelize.authenticate().then(() => {
      console.log("Connected to the database!!!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

// sync
db.sequelize.sync()
};



module.exports = postgresDB;