const server=require("express")
const route=server.Router()

// const indexRoute=require("./common/index.js")
const authRoute=require("./common/auth")
// console.log(authRoute)
const teacherRoute=require("./teacher/profile")
const batch_t_Route=require("./teacher/batch_teacher")
// const material_t_Route=require("./teacher/material_teacher")
const sutdentRoute=require("./student/profile")
const batch_s_route=require("./student/batch_student")
// const material_s_route=require("./student/material_student")



// route.use('/',indexRoute)
route.use('/auth',authRoute)
route.use('/',teacherRoute)
route.use('/',batch_t_Route)
// route.use('/materialteacher',material_t_Route)
route.use('/profile',sutdentRoute)
route.use('/',batch_s_route)
// route.use('/material_s_route',material_s_route)


module.exports=route