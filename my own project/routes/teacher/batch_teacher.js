const batch=require("./../../model/batch")
console.log(batch)
const express=require("express")
import student from "../../model/student"
import batchadmission from "../../model/batchadmission"
import verifyteacher from "./../../middlewere/teacher"
const route=express.Router()
// teacher created batch
route.get('/allbatch',verifyteacher.auth.cookie,async(req,resp)=>{
    let batchs=await batch.find({createdBy:req.data.id,delete:false})
    return resp.json({
        batchs:batchs
    })
   
})


// teacher creating batch
route.post('/createbatch',verifyteacher.auth.cookie,async(req,resp)=>{
    if(req.body.name){
        let createBatch=new batch({
            ...req.body,
            createdBy:req.data.id

        })
        await createBatch.save()
        return resp.send("Batch is created")
    }
})
route.delete('/deletebatch',async(req,resp)=>{
    if(req.body.id){
        await batch.findByIdAndUpdate(req.body.id,{delete:true})
        return resp.json({
            msg:"deleted"
        })
    }
    return resp.send("please enter the batch id")
})
route.get("/allstudent",async (req,resp)=>{
    let students=await student.find({})
    return resp.json({students})
})
route.get("/admission",async(req,resp)=>{
    if(req.body.student_id && req.body.batch_id){
        let batchadmissions=new batchadmission({
            ...req.body
        })
       await batchadmissions.save()
       return resp.json({
           msg:"student added"
       })
    }
})


module.exports=route