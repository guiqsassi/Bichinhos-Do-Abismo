import express from "express"
import authMiddleware from "../middlewares/auth";

const squadRoutes = express.Router()

squadRoutes.get("/:id", async(req,res)=>{

})
.get("/", async(req,res)=>{

})
.post("/" ,async(req,res)=>{

})
.put("/", async(req,res)=>{

})
.delete("/:id", async(req,res)=>{

})

export default squadRoutes;