const mongoose = require('mongoose');




const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,        
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

})

