import { NextFunction, Request } from "express"
import jwt, { DecodeOptions } from "jsonwebtoken"
import express from "express"
import dotenv from "dotenv"

dotenv.config()
const jwtSecret = process.env.JWT_KEY
const authMiddleware = express()
authMiddleware.use((req, res, next)=>{

    const token = req.cookies["token"]
    token?
    jwt.verify(token, jwtSecret, (err, decode)=>{
        if(err){
            res.status(400)
            .json({message: "Token inválido"})
        }else{

            next()
        }

    }):
    res.status(400)
    .json({message: "Token não inserido"})
    
})


export default authMiddleware;