const mongoose = require('mongoose');




const carSchema = new mongoose.Schema({
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin"
    },
            
    name:{
        type: String,        
    },
    manufacturer:{
        type: String,
    },
    year:{
        type: String,
    },
    picture:{
        type: String,
    },
    number_of_days:{
        type: String,
    },
    amount: {
      type: String,
    },
},
    {
        timestamps: true,
    }
)


module.exports = mongoose.model('Cars', carSchema);