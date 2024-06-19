import express from "express"
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import squadServices from "../services/squad.services";
import leaderMiddleware from "../middlewares/leader";

const squadRoutes = express.Router()

squadRoutes.get("/:id",authMiddleware, async(req,res)=>{
  squadServices.read(req,res)
})
.get("/",authMiddleware ,async(req,res)=>{
    squadServices.list(req,res)
  
})

.post("/",adminMiddleware,async(req,res)=>{
  squadServices.create(req,res)
})
.put("/",adminMiddleware, async(req,res)=>{
  squadServices.update(req,res)
})
.delete("/:id", adminMiddleware,async(req,res)=>{
  squadServices.delete(req,res)
})
.put("/addLeader", leaderMiddleware, async(req,res)=>{
  squadServices.addLeader(req,res)
})
.put("/addMember", leaderMiddleware, async(req,res)=>{
  squadServices.addMember(req,res)
})
.put("/removeLeader", leaderMiddleware, async(req,res)=>{
  squadServices.removeLeader(req,res)
})
.put("/removeMember", leaderMiddleware, async(req,res)=>{
  squadServices.removeMember(req,res)
})
export default squadRoutes;