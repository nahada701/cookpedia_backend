const jwt=require("jsonwebtoken")

const jwtMiddleware=(req,res,next)=>{
    console.log("inside jwt middleware");

    const token=req.headers["authorization"].split(" ")[1]
    if(token){
      try { 
        const jwtResponse=jwt.verify(token,process.env.JWT_PASSWORD)
        req.userId=jwtResponse.userId
        next()
      }
      catch(err){
        res.status(404).json("Authorization failed please login ")
      }

    }else{
        res.status(404).json("Authorization failed invalid or exppired token")
        console.log("authorization failed");
        
    }

    
}

module.exports=jwtMiddleware