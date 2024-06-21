import { NextFunction, Request } from "express"
import jwt, { DecodeOptions } from "jsonwebtoken"
import express from "express"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"

dotenv.config()
const jwtSecret = process.env.JWT_KEY
const leaderMiddleware = express()
const prisma = new PrismaClient()

leaderMiddleware.use(async(req, res, next)=>{

    const token = req.cookies["token"]
    token?
    jwt.verify(token, jwtSecret, (err, decode)=>{
        if(err){
            res.status(401)
            .json({message: "Token inválido"})
        }else{
            prisma.user.findUnique({where: {id: Number(decode.id)}}).then(r=>{

              if(r.role == "LEADER" || r.role == "ADMIN"){
                next()
              }else{
                res
                .status(403)
                .json({message: "Você não tem autorização para isso"})

              }
            })
        }


    }):
    res.status(401)
    .json({message: "Token não inserido"})
    
})


export default leaderMiddleware;