import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
dotenv.config()

const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(morgan())

app.listen(process.env.PORT, ()=>{
  console.log(process.env.PORT);
  
  console.log("Bem vindo a Api")

})