require("dotenv").config()
const cors=require('cors')
const express=require('express')
const router = require("./Routes/router")
const bodyParser  = require("body-parser")

require("./db/db")

const cookpediaServer=express()



cookpediaServer.use(cors())
cookpediaServer.use(express.json({limit:"500mb"}))
cookpediaServer.use(router)
const PORT=3000||process.env.PORT



cookpediaServer.listen(PORT,()=>{
    console.log(`cookpedia server server running at port ${PORT} successfully`);
    
})

cookpediaServer.get('/',(req,res)=>{
    res.status(200).send(`cookpedia server server running at port ${PORT} successfully`)
})