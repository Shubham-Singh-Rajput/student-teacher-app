const mongoose=require("mongoose")
const adminSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"enter the name"]
    },
    email:{
        type:String,
        required:[true,"enter the email"]
    },password:{
        type:String,
        required:[true,"enter the password"]
    },
    type:{
        type:String,
        default:"ADMIN"
    }

})

module.exports=new mongoose.model("admin",adminSchema)