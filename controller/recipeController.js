const recipes=require('../model/recipeModel')

exports.getAllRecipesController=async(req,res)=>{
    console.log("inside get recipe controller");
    try {

        const allRecipes=await recipes.find()
        res.status(200).json(allRecipes)
        
    } catch (error) {
       res.status(401).json(error) 
    }
    
}

exports.getSingleRecipeController=async(req,res)=>{
    console.log("inside get single recipe controller");

    const {id}=req.params

    try {

        const recipeDetials=await recipes.findById({_id:id})
        res.status(200).json(recipeDetials)
        
    } catch (error) {
        res.status(401).json(error)
    }
    
}

exports.getRelatedRecipeController=async(req,res)=>{
    console.log("inside related recipe controller");
    
    // passing data though url and accessed using req.query.keyname

    const cuisine=req.query.cuisine
    try {

        const relatedRecipes=await recipes.find({cuisine})
        
        res.status(200).json(relatedRecipes)
        
    } catch (error) {
      res.status(401).json(error)  
    }



}

exports.addNewRecieController=async(req,res)=>{
    console.log("inside new recipe controller")

    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=req.body
    try{

        const exisitngRecipe=await recipes.findOne({name})
        if(exisitngRecipe){
            res.status(406).json("Recipe already exists")
        } 
        else{
            const newRecipe=new recipes( {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType})

            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.editRecipeController=async(req,res)=>{
    console.log("inside edit recipe controller")
    const {id}=req.params
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType}=req.body
    try{

         const updatedRecipe=await recipes.findByIdAndUpdate({_id:id},{name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType},{new:true})
         await updatedRecipe.save()
         res.status(200).json(updatedRecipe)
     
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.deleteRecipeController=async(req,res)=>{
    console.log("Insidee dele recipe controller");

    const {id}=req.params
    try{

        const deletedRecipe=await recipes.findByIdAndDelete({_id:id})
        res.status(200).json(deletedRecipe)
    }catch(err){
        res.status(401).json(err)
    }
    
}