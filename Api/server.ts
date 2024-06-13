import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.listen(process.env.PORT, ()=>{
  console.log(process.env.PORT);
  
  console.log("Bem vindo a Api")

})