import express from "express"
import projectsServices from "../services/projects.services";
import authMiddleware from "../middlewares/auth";
import leaderMiddleware from "../middlewares/leader";

const projectsRoutes = express.Router()

projectsRoutes.get("/:id",authMiddleware ,async(req,res)=>{
  projectsServices.read(req,res)
})
.get("/",authMiddleware ,async(req,res)=>{
  projectsServices.list(req,res)
})
.post("/", leaderMiddleware,async(req,res)=>{
  projectsServices.create(req,res)  
})
.put("/", leaderMiddleware,async(req,res)=>{
  projectsServices.update(req,res)
})
.delete("/:id", leaderMiddleware,async(req,res)=>{
  projectsServices.delete(req,res)
})

export default projectsRoutes;