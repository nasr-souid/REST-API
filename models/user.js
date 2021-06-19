const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true, 
    },
    age:{
        type:Number,
        required: true
    },
    mail:{
        type:String,
        lowercase: true,
        unique: true   
    },
    password:{
        unique: true
}})

let User=mongoose.model('User',userSchema,'users')

module.exports = User