const mongoose=require("mongoose")

const downloadRecipeSchema=new mongoose.Schema({
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
    recipeCuisine:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        required:true
    }
})

const downloadRecipe=mongoose.model("downlaodRecipe",downloadRecipeSchema)

module.exports=downloadRecipe