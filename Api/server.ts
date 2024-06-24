import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import router from "./src/routes/routes"
import swagger from "./swagger"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(morgan("tiny"))
app.use(cookieParser())
app.use(router)
app.use(swagger)
app.listen(process.env.PORT, ()=>{
  console.log(process.env.PORT);
  
  console.log("Bem vindo a Api")

})

