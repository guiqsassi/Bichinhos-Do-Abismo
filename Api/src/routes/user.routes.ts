/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Operações relacionadas a usuários
 */
import express from "express"
import UserSevices from "../services/user.services";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const userRoutes = express.Router()


userRoutes.

  /**
   * @swagger
   * /user/${id}:
   *   get:
   *     summary: Ler informações de um usuário
   *     tags: [Usuários]
   *     parameters:
   *       - in: query
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       '200':
   *         description: Usuário encontrado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "usuário encontrado"
   *                 response:
   *                   $ref: '#/components/schemas/User'
   *       '400':
   *         description: Usuário não encontrado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "usuário não encontrado"
   *                 response:
   *                   type: object
   *                   example: {}
   */
get("/:id",authMiddleware ,async(req,res)=>{
  UserSevices.read(req,res)
})

  /**
   * @swagger
   * /user:
   *   get:
   *     summary: Listar todos os usuários
   *     tags: [Usuários]
   *     responses:
   *       '200':
   *         description: Lista de usuários encontrada
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "usuários encontrados"
   *                 response:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/User'
   *       '400':
   *         description: Usuários não encontrados
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "usuários não encontrados"
   *                 response:
   *                   type: object
   *                   example: {}
   */
.get("/", authMiddleware,async(req,res)=>{
  UserSevices.list(req,res)
})
 /**
   * @swagger
   * /user:
   *   post:
   *     summary: Criar um novo usuário
   *     tags: [Usuários]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       '200':
   *         description: Usuário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "usuário criado com sucesso"
   *                 response:
   *                   $ref: '#/components/schemas/User'
   *       '400':
   *         description: Erro ao criar o usuário
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "usuário não criado"
   *                 error:
   *                   type: object
   *                   example: {}
   */
.post("/",async(req,res)=>{
  UserSevices.create(req,res)
})

  /**
   * @swagger
   * /user:
   *   put:
   *     summary: Atualizar um usuário
   *     tags: [Usuários]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       '200':
   *         description: Usuário atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "usuário atualizado com sucesso"
   *                 response:
   *                   $ref: '#/components/schemas/User'
   *       '400':
   *         description: Erro ao atualizar o usuário
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Houve algum problema para atualizar seu usuário"
   *                 response:
   *                   type: object
   *                   example: {}
   */
.put("/", authMiddleware,async(req,res)=>{
  UserSevices.update(req,res)
})
  /**
   * @swagger
   * /user:
   *   delete:
   *     summary: Deletar um usuário
   *     tags: [Usuários]
   *     parameters:
   *       - in: query
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       '204':
   *         description: Usuário deletado com sucesso
   *       '400':
   *         description: Erro ao deletar o usuário
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "algo deu errado ao tentar deletar este usuário"
   *                 response:
   *                   type: object
   *                   example: {}
   */
.delete("/:id", authMiddleware,async(req,res)=>{
  UserSevices.delete(req,res)
})

export default userRoutes;
