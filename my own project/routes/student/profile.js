// change profile student 
const server=require("express")
const route=server.Router()
const path =require("path")
import verify from "./../../middlewere/auth"
import teacherverify from "./../../middlewere/teacher"
import student from "../../model/student"
const multer =require('multer')
const diskstroage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./upload")
    },filename:(req,file,cb)=>{
        let filename=file.fieldname+"-"+Date.now()+'-'+path.extname(file.originalname)
        req.filename=filename
        cb(null,filename)
    }
})
let upload=multer({storage:diskstroage})

// seeing profile
route.get('/',verify.auth.cookie,async(req,resp)=>{
    let StudentUser= await student.findById(req.data.id)
    return resp.json(StudentUser)
})

// updating name and profile pic
route.post("/student",verify.auth.cookie,upload.single('image'),async(req,resp)=>{
    if(req.body.name){
        // console.log(req.filename,req.data.id,req.body)
        let StudentUser= await student.findByIdAndUpdate(req.data.id,{...req.body},{new: true})
        if(req.filename){
            StudentUser.profilePhoto=req.filename
        }
        await StudentUser.save()
        return resp.send(StudentUser)
    }
    return resp.send("please give name and password if you want to edit")
}) 
module.exports=route