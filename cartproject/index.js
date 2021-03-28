import "babel-polyfill"
import route from "./admin/allroutes"
const connect=require("./connect/connect")
const server=require("express")
connect()
const app=server()
app.use(server.json())
app.use(server.urlencoded({extended:true}))
app.use(route.route)

app.listen(2000,()=>{
    console.log("listen at prot no. 2000")
})