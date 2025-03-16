const users=require('../model/userModel')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
exports.userRegistrtionController=async(req,res)=>{
    console.log("inside user registraion controller");
    const{username,email,password}=req.body
    try{

        const existingUser=await users.findOne({email})

        if(existingUser){
           return  res.status(406).json("User already exists")
        }
        else{
            // method hash is used to encrypt data
            // here 10 is salt round the number of times the process should be done
            const encryptedPassword=await bcrypt.hash(password,10)
            const newUser=new users({username,email,password:encryptedPassword,profilePic:""})
            await newUser.save()
            res.status(200).json(newUser)
        }

    }catch(err){
        res.status(401).json(err)
    }
    
}

exports.userLoginController=async(req,res)=>{
    console.log("inside user login controller")
    const{email,password}=req.body

    try{
        const existingUser=await users.findOne({email})

        if(existingUser){
            if(existingUser.role=="User"){
             const isPasswordMatch=await bcrypt.compare(password,existingUser.password)
             if(isPasswordMatch){
                const token=jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
                res.status(200).json({user:existingUser,token})

             }else{
                res.status(404).json("Invalid email or password")
             }

            }
            else {

                if(password==existingUser.password){
                    const token=jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
                    res.status(200).json({user:existingUser,token})
      
                }else{
                    res.status(404).json("Invalid usernmae or password")
                }

            }

        }else{
            res.status(404).json("Invalid email or password")
        }


    }catch(err){
    res.status(401).json(err)
     }


    
}

exports.editUserController=async(req,res)=>{
    console.log("inside edit user controller")
    const userId=req.userId
    const {profilePic}=req.body


    try {
        // findById wont need all the data to update so no need of put method
        const existingUser=await users.findById({_id:userId})
        console.log(existingUser);
        
        existingUser.profilePic=profilePic
        await existingUser.save()
        res.status(200).json(existingUser)
        
    } catch (error) {
        res.status(401).json(error)
    }
}


exports.getAllUserController=async(req,res)=>{
  console.log("get all users controller")
  try{

    const userList=await users.find({role:"User"})
    res.status(200).json(userList)
  }catch(err){
    res.status(401).json(err)
  }
  

    
}