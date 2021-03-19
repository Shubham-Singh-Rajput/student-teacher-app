const mongoose = require("mongoose")

let studentSchema=mongoose.Schema({
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
    },methord:{
        type:String,
        required:true
    },password:{
        type:String
    }
})

module.exports=mongoose.model("student",studentSchema)