import admin from "./../../schema/admin"
console.log(admin)
let signup={
    postsignup:async(req,resp)=>{
        try{
            let persentadmin=await admin.findOne({email:req.body.email})
            // console.log(persentadmin)
            if(!persentadmin){
                let newadmin=new admin({
                    ...req.body
                })
                await newadmin.save()
                return resp.json(newadmin)
            }
            return resp.send("please enter the id")
        }
        catch(e){
            // console.log(e.message)
            let error={}
            // console.log(e.errors)
            for (const key in e.errors) {
                error[key]=e.errors[key].message
                // console.log(e.errors[key].message)
            }
            // console.error(error)
            return resp.json(error)

        }
    }
}
module.exports=signup