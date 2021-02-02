const mongoose = require('mongoose')


const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true

    },
    email:{
        type:String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    date:{
        type:Date,
        createdAt:Date.now()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User