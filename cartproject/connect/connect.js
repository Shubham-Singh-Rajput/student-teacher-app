const mongoose = require("mongoose")
let url="mongodb://localhost:27017/movie"
let connect=()=>{
    try{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true})
        console.log("connected")
    }
    catch(e){
        console.log(e.message)
    }
}
module.exports=connect