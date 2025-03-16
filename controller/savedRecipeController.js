const recipes = require("../model/recipeModel");
const savedRecipes=require("../model/savedRecipeModel")

exports.saveRecipeController=async (req,res)=>{
    console.log("inside saved recipe controller");
    const {id}=req.params
    const{name,image}=req.body
    const userId=req.userId

    try {

        const existingRecipe=await savedRecipes.findOne({recipeId:id,userId})
        if(existingRecipe){
            res.status(406).json("Recipe already saved explore other recipes")
        }else{
            const newRecipe=new savedRecipes({recipeId:id,name,image,userId})
            await newRecipe.save()
            res.status(200).json(newRecipe)

        }

        
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.getUserSavedRecipe=async(req,res)=>{
    console.log("inside user saved recipe controller");

    try {
        const userId=req.userId

        const userSavedRecipes=await savedRecipes.find({userId})

        res.status(200).json(userSavedRecipes)


        
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.removeSavedRecipeController=async(req,res)=>{
    console.log("insdie remove saved recipe controller");

    try {

        const {id}=req.params

        const removedRecipe=await savedRecipes.findByIdAndDelete(id)
        
        res.status(200).json(removedRecipe)
    } catch (error) {
        res.status(401).json(error)
    }
    
}