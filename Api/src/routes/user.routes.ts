import express from "express"
import UserSevices from "../services/user.services";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const userRoutes = express.Router()

userRoutes.get("/:id",authMiddleware ,async(req,res)=>{
  UserSevices.read(req,res)
})
.get("/", authMiddleware,async(req,res)=>{
  UserSevices.list(req,res)
})
.post("/",async(req,res)=>{
  UserSevices.create(req,res)
})
.put("/", authMiddleware,async(req,res)=>{
  UserSevices.update(req,res)
})
.delete("/:id", authMiddleware,async(req,res)=>{
  UserSevices.delete(req,res)
})

export default userRoutes;