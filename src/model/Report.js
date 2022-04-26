const mongoose=require('mongoose');

const Report = mongoose.model("Report",{
    title:{
        type:String,
        required:true,
        trim:true,
    },
      description:{
        type:String,
        required:true,
        trim:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    Reporter:{
        type:Buffer
    }
})
module.exports={Report};