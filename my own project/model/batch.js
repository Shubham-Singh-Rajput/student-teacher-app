const mongoose = require("mongoose")

const batch=mongoose.Schema({
    name:{
        type:String
    },
    createdBy:{
    type:mongoose.Types.ObjectId,
    ref:"teacher"
    },
    delete:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now()
    }
})


module.exports=mongoose.model("batch",batch)