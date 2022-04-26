const express= require('express');
const Router = express.Router();
const {addReport,removeReport,getReport,getReports,editReport} = require('../controllers/Reports.controller');
const {auth}=require('../auth/auth')
Router.get("/report/:id",auth,getReport)
Router.get("/reports",auth,getReports)
Router.post("/report",auth,addReport)
Router.delete("/report/:id",auth,removeReport)
Router.put("/report/:id",auth,editReport)


module.exports=Router