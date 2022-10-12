const mongoose = require('mongoose');




const userSchema = new mongoose.Schema({
    googleid:{
        type: String,
        trim: true,        
    },
    username:{
        type: String,
        trim: true,        
    },
    email:{
        type: String,
        unique: true,
    },
    picture:{
        type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

},
{
    timestamps: true,
}
)


module.exports = mongoose.model('Users', userSchema);