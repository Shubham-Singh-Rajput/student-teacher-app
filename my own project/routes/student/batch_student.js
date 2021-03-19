const express = require('express');
const batch = require('../../model/batch');
const batchadmission = require('../../model/batchadmission');
import verify from "./../../middlewere/auth"
const route = express.Router();

route.post('/admission',verify.auth.cookie,async(req,resp)=>{
    let admission=await batchadmission.find({student_id:req.data.id})
    let batches=admission.map(i=>i.batch_id)
    let allbatches=await batch.find({_id:{$in :batches }}).populate('createdBy', 'name email')
    return resp.json({
        allbatches
    })
})

module.exports=route