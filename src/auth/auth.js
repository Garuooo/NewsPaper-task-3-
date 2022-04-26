const jwt = require("jsonwebtoken");
const {Reporter}= require('../model/Reporter')

const auth = async(req,res,next)=>{
try{
    const token = req.header("Authorization").replace("Bearer ","");
    if(!token)
    {
      throw "Authorization Failed";
    }
    const decode = jwt.verify(token,"Garou");
    const reporter = await Reporter.findOne({_id:decode._id,tokens:token})
    if(!reporter)
      {
        throw "Authorization Failed";

      }
    req.reporter=reporter;
    req.token=token;
    next();
}
catch(error){
    res.status(400).json(error)
}
}
module.exports={auth}