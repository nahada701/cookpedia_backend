const testimonials=require('../model/testmonyModel')

exports.addTestimonyController=async(req,res)=>{
    console.log("inside add tesimony controller");

    const {name,email,message}=req.body
    try{
        const newTestimony=new testimonials({name,email,message})
        await newTestimony.save()
        res.status(200).json(newTestimony)
    }catch(err){
        res.status(401).json(err)
    }
    

}

exports.getAllTestimonials=async(req,res)=>{
    console.log("Inside get all testimonial controller");

    try {
        const allTestimonials=await testimonials.find()
        res.status(200).json(allTestimonials)
        
    } catch (error) {
        res.status(401).json(error)
    }
    
}



exports.updateTestimonyStatus=async(req,res)=>{
    console.log("inside update testimonuial controller");
    const {id}=req.params
    const status=req.query.status

    try{

        const existingFeedback=await testimonials.findById({_id:id})

        existingFeedback.status=status
        existingFeedback.save()
        res.status(200).json(existingFeedback)


    }
    catch(err){
        res.status(401).json(err)
    }
    
}

exports.getAllApprovedTestimonialsController=async(req,res)=>{
    console.log("inide get all apprvedd testimonals ");
    try {
        const allApprovedList=await testimonials.find({status:"Approved"})
        res.status(200).json(allApprovedList)
    } catch (error) {
        res.status(401).json(error)
    }


}