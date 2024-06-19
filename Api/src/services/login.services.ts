import express, { Request, Response } from "express"
import {PrismaClient} from "@prisma/client"
import dotenv from "dotenv"
import { CookieOptions } from "express"
import bcrypt from "bcrypt"
import dayjs from "dayjs"
import jwt from "jsonwebtoken"
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

const loginServices = {
  login: async (req:Request,  res: Response) =>{
  const userInputData:user = req.body
  const date = dayjs()
  const user = await prisma.user.findUnique({
    where: {email: userInputData.email}
  })
  user?
  await bcrypt.compare(userInputData.password, user.password, (err, r)=>{
    
    if(r){
      
      const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: true,
        expires: dayjs(Date.now()).add(10, "hour").toDate()
      }
      const payload = {id: user.id}
      const token = jwt.sign(payload, secret, {expiresIn: "10h"})

      res.status(200)
      .cookie("token", token, cookieOptions)
      .send("login efetuado com sucesso")
    }else{
      res
      .status(400)
      .json({message: "Email ou senha incorretos"})  
    }

  
  }): 
  res.status(400)
  .json({message: "Email ou senha incorretos"})
  },
  register: async(req:Request,res:Response)=>{
    const userInputData:user = req.body
    console.log(saltRounds);
    
    await bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(userInputData.password, salt, function(err, hash) {});
    });
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(userInputData.password,salt)

  await prisma.user.create({
    data: {
      username: userInputData.username,
      email: userInputData.email,
      password: hash
    } 
  }).then(r=>{
    res
    .status(201)
    .json({message: "usuário criado com sucesso", r})
  }).catch(e=>{
    res.status(400)
    .json({message: "erro ao criar usuário", e})
  })
  
  }
}

export default loginServices;