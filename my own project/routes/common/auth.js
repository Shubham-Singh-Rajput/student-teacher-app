const server=require("express")
const route=server.Router()
import signup from "./singnUP"
import login from "./login"
import verify from "./../../middlewere/auth"
import teacherverify from "./../../middlewere/teacher"
// signup student
route.post('/studentsignup',signup.signUp.student_postsignup)
route.post('/teachersignup',signup.signUp.teacher_postsignup)
route.post('/teacherlogin',login.login.teacherlogin)
route.post('/studentlogin',login.login.studentLogin)




route.post('/',(req,resp)=>{
    resp.clearCookie("token")
    req.session.userId="",
    req.session.user_type=""
    resp.json({
        msg:"cookie clear session clear"
    })
})

route.post('/cookie',verify.auth.cookie,(req,resp)=>{
    // console.log(req.data)
    resp.json({...req.data,msg:"cookie"})
})
route.post('/header',verify.auth.header,(req,resp)=>{
    // console.log(req.data)
    resp.json({...req.user,msg:"header"})
})
route.post('/session',verify.auth.session,(req,resp)=>{
    // console.log(req.data)
    resp.json({...req.data,msg:"session"})
})
module.exports=route