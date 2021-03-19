// change profile student 
const server=require("express")
const route=server.Router()
const path =require("path")
import verifyteacher from "./../../middlewere/teacher"
import teacher from "../../model/teacher"
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
route.get('/profile/teacher',verifyteacher.auth.cookie,async(req,resp)=>{
    console.log(req.data)
    let teacherUser= await teacher.findById(req.data.id)
    return resp.json(teacherUser)
})

// updating name and profile pic
route.post("/teacher/update",verifyteacher.auth.cookie,upload.single('image'),async(req,resp)=>{
    if(req.body.name){
        // console.log(req.filename,req.data.id,req.body)
        let teacherUser= await teacher.findByIdAndUpdate(req.data.id,{...req.body},{new: true})
        if(req.filename){
            teacherUser.profilePhoto=req.filename
        }
        await teacherUser.save()
        return resp.send(teacherUser)
    }
    return resp.send("please give name and password if you want to edit")
}) 
module.exports=route