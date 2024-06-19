import express from "express"
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const newsRoutes = express.Router()

newsRoutes.get("/:id", async(req,res)=>{

})
.get("/",authMiddleware, async(req,res)=>{
  res.send("oi")
})
.post("/", adminMiddleware, async(req,res)=>{
  res.send("oi")
})
.put("/", async(req,res)=>{

})
.delete("/:id", async(req,res)=>{

})

export default newsRoutes;