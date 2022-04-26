const {Reporter} = require('../model/Reporter');
const multer = require("multer")
const signUp= async (req,res)=>{
  try{
        const reporter = new Reporter(req.query);
        await reporter.save();
        const token = await reporter.createToken();
        res.status(200).json({reporter,token})
  }
  catch(e)
  {
      res.status(400).json(e)
  }

}
const logIn = async(req,res)=>{
 try{
   const reporter =await Reporter.findReporter(req.query.email,req.query.password)
  await reporter.createToken();
  res.status(200).json(reporter)
 }
 catch(error)
 {
  res.status(400).json(error)
 }
}
const logOut=async(req,res)=>{
 try{
    //filterToken
  const newTokens = req.reporter.tokens.filter(token=>{
    return token != req.token
  })
  req.reporter.tokens=newTokens;
  await req.reporter.save()
 }
 catch(error)
 {
   res.status(500).json(error);
 }
 res.status(200).send("Signed Out")
}

const deleteReporter = async(req,res)=>{
try{
 const deleted = await Reporter.deleteOne(req.reporter);
  res.status(200).json(deleted)
}
catch(error){
  res.status(500).json(error)
}
}
const editReporter = async (req,res)=>{
  oldReporter = req.reporter;
  const newPhone = req.query.phoneNumber;
  const newEmail = req.query.email;
  const newPassword = req.query.password;
  const newAge = req.query.age;
  const newName = req.query.name;

  if(newPhone)
    oldReporter.phoneNumber=newPhone;
  if(newEmail)
    oldReporter.email=newEmail;
  if(newPassword)
   oldReporter.password=newPassword;
  if(newAge)
   oldReporter.age=newAge;  
   if(newName)
   oldReporter.name=newName;  
  
try{
  oldReporter.save();
  console.log(oldReporter)
  res.status(200).json({edited:oldReporter})
}
catch(error)
{throw new Error("Invalid Request")}


}

const uploads = multer({
    limits:{
        fileSize:3000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
            cb(new Error('Please upload image'))
        }
        cb(null,true)
    }
})


const addAvatar = async ()=>{
uploads.single('avatar'),async(req,res)=>{
    try{
        // avatar --> model
        req.user.avatar = req.file.buffer
        await req.user.save()
        res.send()
    }
    catch(e){
        res.send(e)
    }
}
}
module.exports={signUp,logIn,logOut,deleteReporter,editReporter,addAvatar}