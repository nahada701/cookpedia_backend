const mongoose=require("mongoose")
const connetion_string=process.env.CONNECTION_STRING

mongoose.connect(connetion_string).then(res=>{
   console.log("MongoDb atlast connected");
   
}).catch(err=>{
   console.log("Connection Error");
   console.log(err);
   

})

