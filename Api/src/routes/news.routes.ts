import express from "express"
import authMiddleware from "../middlewares/auth";

const newsRoutes = express.Router()

newsRoutes.get("/:id", async(req,res)=>{

})
.get("/",authMiddleware, async(req,res)=>{
  res.send("oi")
})
.post("/", async(req,res)=>{

})
.put("/", async(req,res)=>{

})
.delete("/:id", async(req,res)=>{

})

export default newsRoutes;