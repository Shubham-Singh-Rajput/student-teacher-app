const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
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
        default:"USER"
    }

})

module.exports=new mongoose.model("user",userSchema)