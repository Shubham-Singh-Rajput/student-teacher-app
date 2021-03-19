const mongoose = require("mongoose")

let teacherSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    profilePhoto:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    password:{
        type:String
    }
})
console.log("here")
module.exports=mongoose.model("teacher",teacherSchema)