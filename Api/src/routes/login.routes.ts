import express, { Request, Response } from "express"
import {PrismaClient} from "@prisma/client"
import dotenv from "dotenv"
import { CookieOptions } from "express"
import bcrypt from "bcrypt"
import dayjs from "dayjs"
import jwt from "jsonwebtoken"
import loginServices from "../services/login.services"
import swagger from "../../swagger"

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
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login de usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       '200':
 *         description: Login efetuado com sucesso
 *         headers:
 *           Set-Cookie:
 *             description: >
 *               Um cookie HTTP contendo o token JWT. O cookie é seguro e só pode ser acessado pelo lado do servidor.
 *             schema:
 *               type: string
 *               example: "token=jwt_token; HttpOnly; Secure; Expires=Wed, 21 Oct 2021 07:28:00 GMT"
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "login efetuado com sucesso"
 *       '400':
 *         description: Email ou senha incorretos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email ou senha incorretos"
 *     tags:
 *       - Auth
 */


loginRoutes.post("/login", async(req:Request, res:Response)=>{
  loginServices.login(req,res)
})
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "usuário criado com sucesso"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       format: int64
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "johndoe"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "johndoe@example.com"
 *       '400':
 *         description: Erro ao criar usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "erro ao criar usuário"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Email já cadastrado"
 *     tags:
 *       - Auth
 */

loginRoutes.post("/register", async(req:Request, res:Response)=>{
   loginServices.register(req,res)
})

export default loginRoutes;