import "babel-polyfill"
const cookiePraser=require("cookie-parser")
const session= require("express-session")

const server= require("express")

const app=server()
const path = require("path")
// const morgan=require("morgan")
const mongoose= require("mongoose")
const route=require("./routes/index")
let connect=async()=>{
    let mongouri='mongodb://localhost:27017/teacherandstudent'
    try{
        await mongoose.connect(mongouri,{useUnifiedTopology:true,useNewUrlParser:true})
        console.log("connected")
    }
    catch(e){
        console.log(e.message)
    }
}
connect()
app.use(cookiePraser())
app.use(session({
    secret:"111"
}))
app.use(server.json({"limit":"3mb"}))
app.use(server.urlencoded({"limit":"3mb",extended:true}))
app.use(route)
app.listen(2000)

