import express, { Request, Response } from "express"
import {PrismaClient} from "@prisma/client"
import dotenv from "dotenv"
import { CookieOptions } from "express"
import bcrypt from "bcrypt"
import dayjs from "dayjs"
import jwt from "jsonwebtoken"
import loginServices from "../services/login.services"
dotenv.config()
const loginRoutes = express.Router()
const prisma = new PrismaClient()

type user = { 
  id?: number,
  username: string,
  email: string,
  password: string
}

const saltRounds = Number(process.env.SALT_ROUNDS)
const secret = process.env.JWT_KEY
loginRoutes.post("/login", async(req:Request, res:Response)=>{
  loginServices.login(req,res)
})
loginRoutes.post("/register", async(req:Request, res:Response)=>{
   loginServices.register(req,res)
})

export default loginRoutes;