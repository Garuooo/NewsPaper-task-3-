const {Report} = require("../model/Report");
const addReport = async (req,res)=>{
    try{
    const report = new Report(req.query);
    report.owner=req.reporter._id;
    await report.save()
    res.json(report)
    }
    catch(error){
        res.status(200).json(error)
    }
}
const removeReport = async (req,res)=>{
     try{
         const deletedReport = await Report.findOneAndDelete({owner:req.reporter._id,_id:req.params.id});
         res.status(200).json({deleted:deletedReport})
     }
     catch(error){res.status(400).json(error)}
}

const getReport=async (req,res)=>{
    try{
        const report = await Report.findOne({owner:req.reporter._id,_id:req.params.id});
        res.status(200).json({report})
    }
    catch(error){
        res.status(400).json(error)
    }
}

const getReports=async(req,res)=>{
   try{
        const reports = await Report.find({owner:req.reporter._id});
        res.status(200).json({reports})
    }
    catch(error){
        res.status(400).json(error)
    }
}
const editReport=async(req,res)=>{
     try{
        const report = await Report.findOne({owner:req.reporter._id,_id:req.params.id});
        if(req.query.title)
        report.title=req.query.title;
        if(req.query.description)
        report.title=req.query.description;
        console.log(report)
        await report.save();

        res.status(200).json({report})
    }
    catch(error){
        res.status(400).json(error)
    }
}


module.exports={addReport,removeReport,getReport,getReports,editReport}