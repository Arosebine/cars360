const mongoose = require('mongoose');



const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL, )
    console.log("Connected to car360 Database");
    } catch (error) {
        console.log("Car360 Database has been disconnected");
    }
    
}





module.exports = connectDB;