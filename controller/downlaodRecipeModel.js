const downloadRecipe=require("../model/downloadModel")
const userDownloadRecipe=require("../model/userDownlaodModel")

exports.addDownloadController=async(req,res)=>{
    console.log("inisde add downlaod controller");

    try {
        const {id}=req.params
        const userId=req.userId
        const{name,image,cuisine}=req.body
        const existingDownlaod=await downloadRecipe.findOne({recipeId:id})
        const existingUserDownlaod=await userDownloadRecipe.findOne({recipeId:id,userId})

        if(existingDownlaod){
          existingDownlaod.count+=1
           await existingDownlaod.save()
           res.status(200).json(existingDownlaod)
        }else{
            const newDownloadRecipe=new downloadRecipe({recipeId:id,recipeName:name,recipeImage:image,recipeCuisine:cuisine,count:1})
            await newDownloadRecipe.save()
            res.status(200).json(newDownloadRecipe)
        }


        if(!existingUserDownlaod){
            const newUserDownlaod=new userDownloadRecipe({recipeId:id,recipeName:name,recipeImage:image,userId})
            await newUserDownlaod.save()
        }
    } catch (error) {
        console.log(error);
        
    }
    
}


exports.getUserDownloads=async(req,res)=>{
    console.log("get user downlaod controller")

    try {

        const userId=req.userId

        const userDownalodList=await userDownloadRecipe.find({userId})
        res.status(200).json(userDownalodList)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.getAllDownloads=async(req,res)=>{
    console.log("get all downloads controller")

    try {
        const allDownalodList=await downloadRecipe.find()
        res.status(200).json(allDownalodList)
        
    } catch (error) {
        res.status(401).json(error)
    }
}