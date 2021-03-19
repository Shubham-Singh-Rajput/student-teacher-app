let student= require("./../../model/student")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const teacher = require("../../model/teacher")
let login={
    studentLogin:async(req,resp)=>{
        if(req.body.name && req.body.email && req.body.password){
            let emailFind=await student.findOne({email:req.body.email})
            if(emailFind){
                let match =await bcrypt.compare(req.body.password,emailFind.password)
                if(match){
                    let token=jwt.sign({id:emailFind._id,user_type:"student"},"zzzz")
                    resp.cookie('token',token)
                    req.session.userId=emailFind._id
                    req.session.user_type="student"
                    return resp.json({emailFind})
                }
                return resp.send("enter the correct password")
            }
            return resp.json({
                ...req.body,msg:"enter the correcct email"
            })

        }
        return resp.send("enter all field")
    },
    teacherlogin:async(req,resp)=>{
        if(req.body.name && req.body.email && req.body.password){
            let emailFind=await teacher.findOne({email:req.body.email})
            // console.log(emailFind)
            if(emailFind){
                let match =await bcrypt.compare(req.body.password,emailFind.password)
                if(match){
                    let token=jwt.sign({id:emailFind._id,user_type:"teacher"},"zzzz")
                    resp.cookie('token',token)
                    req.session.userId=emailFind._id
                    req.session.user_type="teacher"
                    return resp.json({emailFind,token})
                }
                    return resp.send("enter the correct password")
            }
            return resp.json({
                ...req.body,msg:"enter the correcct email"
            })

        }
            return resp.send("enter all field")
    }
}
export default{
    login
}