import express from "express"
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import newsService from "../services/news.services";
import leaderMiddleware from "../middlewares/leader";

const newsRoutes = express.Router()

newsRoutes.get("/:id",authMiddleware ,async(req,res)=>{
  newsService.read(req,res)
})
.get("/",authMiddleware, async(req,res)=>{
  newsService.list(req,res)
})
.post("/", leaderMiddleware, async(req,res)=>{
  newsService.create(req, res)
})
.put("/",leaderMiddleware ,async(req,res)=>{
  newsService.update(req,res)
})
.delete("/:id", async(req,res)=>{
  newsService.delete(req,res)
})

export default newsRoutes;