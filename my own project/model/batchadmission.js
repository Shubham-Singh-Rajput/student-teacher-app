const mongoose = require("mongoose")

const batchAdmission=mongoose.Schema({
    batch_id:{
        type:mongoose.Types.ObjectId,
        ref:"batch"
    },
    student_id:{
    type:mongoose.Types.ObjectId,
    ref:"student"
    }
})
module.exports=mongoose.model("batchadmission",batchAdmission)