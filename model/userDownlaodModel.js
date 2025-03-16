const mongoose=require("mongoose")

const userDownloadRecipeSchema=new mongoose.Schema({
    recipeId:{
        type:String,
        required:true
    },
    recipeName:{
        type:String,
        required:true
    },
    recipeImage:{
        type:String,
        required:true
    },
   userId:{
        type:String,
        required:true
   }
})

const userDownloadRecipe=mongoose.model("userDownloadRecipe",userDownloadRecipeSchema)

module.exports=userDownloadRecipe