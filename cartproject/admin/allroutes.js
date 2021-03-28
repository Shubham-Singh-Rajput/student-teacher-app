const signup =require("./signup/signup.js")
const express=require("express")
const route=express.Router()

route.post('/adminsignup',signup.postsignup)


export default{
    route
}