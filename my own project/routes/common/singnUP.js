let student= require("./../../model/student")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const teacher = require("../../model/teacher")
// import  'babel-polyfill'
let signUp={
    student_postsignup:async(req,resp)=>{
        if(req.body.name && req.body.email && req.body.password && req.body.methord=='student' ){
            let emailFind=await student.findOne({email:req.body.email})
            if(emailFind){
                return resp.json({...req.body,
                    msg:"alredy present"
                })
            }
            else{
                const salt=await bcrypt.genSalt(8)
                req.body.password=await bcrypt.hash(req.body.password,salt)
                let newStudent= new student({...req.body})
                await newStudent.save()
                let token=jwt.sign({id:newStudent._id,user_type:'student'},"zzzz")
                resp.cookie('token',token)
                req.session.userId=newStudent._id
                req.session.user_type="student"
                return resp.json({
                    student:newStudent

                })
            }
        }
        else{
            return resp.json({
                ...req.body,
                msg:"please fill exact things"
            })
        }
    },
    teacher_postsignup: async(req,resp)=>{
        if(req.body.name && req.body.email && req.body.password && req.body.methord=='teacher' ){
            let emailFind=await teacher.findOne({email:req.body.email})
            
            if(emailFind){
                return resp.json({...req.body,
                    msg:"alredy present"
                })
            }
            else{
                const salt=await bcrypt.genSalt(8)
                req.body.password=await bcrypt.hash(req.body.password,salt)
                let newTeacher= new teacher({...req.body})
                await newTeacher.save()
                let token=jwt.sign({id:newTeacher._id,user_type:'teacher'},"zzzz")
                resp.cookie('token',token)
                req.session.userId=newTeacher._id
                req.session.user_type="teacher"
                // req.session.cookie.id=token
                // console.log(req.session)

                return resp.json({
                    teacher:newTeacher,
                    session:req.session
                })
            }
        }
        else{
            return resp.json({
                ...req.body,
                msg:"please fill exact things"
            })
        }

    }
}
export default{signUp}