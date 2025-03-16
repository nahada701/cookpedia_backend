const express=require("express")
const { getAllRecipesController, getSingleRecipeController, getRelatedRecipeController, addNewRecieController, editRecipeController, deleteRecipeController } = require("../controller/recipeController")
const { addTestimonyController, getAllTestimonials, updateTestimonyStatus, getAllApprovedTestimonialsController } = require("../controller/testimonyController")
const { userRegistrtionController, userLoginController, editUserController, getAllUserController } = require("../controller/userController")
const jwtMiddleware = require("../middleware/jwtMiddleware")
const { saveRecipeController, getUserSavedRecipe, removeSavedRecipeController } = require("../controller/savedRecipeController")
const { addDownloadController, getUserDownloads, getAllDownloads } = require("../controller/downlaodRecipeModel")

const router=new express.Router()


router.get("/all-recipe",getAllRecipesController)

router.post("/add-testimony",addTestimonyController)

router.post("/register",userRegistrtionController)

router.post("/login",userLoginController)

router.get("/recipe/view/:id",jwtMiddleware,getSingleRecipeController)

router.get("/related-recipes",jwtMiddleware,getRelatedRecipeController)

router.post("/save/recipe/:id",jwtMiddleware,saveRecipeController)

router.get("/user-saved-recipes",jwtMiddleware,getUserSavedRecipe)

router.delete("/remove/save/recipe/:id",jwtMiddleware,removeSavedRecipeController)

router.post("/download/recipe/:id",jwtMiddleware,addDownloadController)

router.get("/user-downlaods",jwtMiddleware,getUserDownloads)

router.post("/user-edit",jwtMiddleware,editUserController)

router.get("/get-userlist",jwtMiddleware,getAllUserController)

router.get("/get-alltestimonials",jwtMiddleware,getAllTestimonials)

router.put("/update-testiminy/:id",updateTestimonyStatus)

router.get("/all-downlaods",jwtMiddleware,getAllDownloads)

router.get("/approved-testimonials",jwtMiddleware,getAllApprovedTestimonialsController)

router.post("/add/recipe",jwtMiddleware,addNewRecieController)

router.put("/edit/recipe/:id",jwtMiddleware,editRecipeController)

router.delete("/delete/recipe/:id",jwtMiddleware,deleteRecipeController)


module.exports=router