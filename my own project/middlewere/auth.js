const jwt = require("jsonwebtoken")
let auth={
    session:async(req,resp,next)=>{
    try{
        if(req.session.userId){
            req.data={
                id:req.session.userId,
                type:req.session.user_type
            }
            next()
        }
        else{
        return resp.json("Plsease login")
        } 
    }
    catch(e){
        return resp.json({msg:"some error occur"})
    }
},
cookie:async(req,resp,next)=>{
    if(req.cookies.token){
        const data= await jwt.verify(req.cookies.token,'zzzz')
        // console.log(data)
        req.data=data
        if(req.data.user_type=='student'){
        return next()
        }
        return resp.send("please login")
    }
    
    return resp.send("please login")
     
},
header:async(req,resp,next)=>{
    try{
    if(!req.headers.token){
        return resp.json({msg:"Please login"})
    }
    const data= await jwt.verify(req.headers.token,'zzzz')
    if(data.id){
        req.user={...data}
        next()
    }
}
catch(e){
    return resp.send("some error")
}
}

}
export default{auth}