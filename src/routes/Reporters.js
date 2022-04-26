const express= require('express');
const Router = express.Router();
const {signUp,logIn,logOut,deleteReporter,editReporter,addAvatar} = require('../controllers/Reporters.controller')
const {auth}=require('../auth/auth')
Router.post("/signup",signUp)
Router.post("/login",logIn)
Router.post("/logout",auth,logOut)
Router.delete("/deleteReporter",auth,deleteReporter)
Router.put("/editReporter",auth,editReporter)
Router.get("/addPicture",addAvatar)

module.exports=Router
