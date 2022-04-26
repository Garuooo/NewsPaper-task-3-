const mongoose=require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const reporterSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
      email:{
        type:String,
        unique:[true,"Email is already used"],
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("invalid Email")
            }
        },
    },
    age:{
        type:Number,
        validate(value){
            if(value<0||value>120)
            {
                throw new Error("Invalid Age")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            let strongPassword = new RegExp(
              "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
            )
            if(!strongPassword.test(value))
            {
                throw new Error(
                    "Password must include uppercase,lowercase,numbers,characters"
                )
            }
        }
    }
    ,phoneNumber:{
        type: String,
        validate(value){
            if(!validator.isMobilePhone(value,["ar-EG"]))
                throw new Error("Invalid Number")
        },
        require:true
    },
    tokens:[
    {
      type:String,
    }],
    avatar:{
        type:Buffer,
    }
})
reporterSchema.pre("save", async function (){
    const reporter =this
    const saltRounds =10;
     if(reporter.isModified('password'))
     {
    const hashedPassword = await bcrypt.hash(reporter.password,saltRounds)
    reporter.password=hashedPassword
     }
    console.log(reporter)
})
//query the whole collection => statics
reporterSchema.statics.findReporter= async (email,password)=>{
  const reporter = await Reporter.findOne({email});
  if(!reporter)
  {
    throw new Error("Invalid Account")
  }
  if(!password)
  {
    throw new Error("Invalid Account")
  }
  if(await bcrypt.compare(password,reporter.password))
    return reporter;
}

//manipulate a single instance of ducument to add token => methods
reporterSchema.methods.createToken = async function (){
 try{
        const reporter = this;
    if(!reporter)
        throw new Error("Reporter Not Found");
    const token = await jwt.sign({_id:reporter._id},"Garou");
    reporter.tokens.push(token);
    console.log(reporter.tokens)
    await reporter.save();
    return token;
 }
 catch(error)
 {
     console.log(error)
 }
}
const Reporter=mongoose.model("Reporter",reporterSchema)
Reporter.createIndexes();
module.exports={Reporter};