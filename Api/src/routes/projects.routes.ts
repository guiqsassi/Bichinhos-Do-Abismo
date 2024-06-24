/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Operações relacionadas a projetos
 */

import express from "express"
import projectsServices from "../services/projects.services";
import authMiddleware from "../middlewares/auth";
import leaderMiddleware from "../middlewares/leader";

const projectsRoutes = express.Router()
  /**
   * @swagger
   * /project/${id}:
   *   get:
   *     summary: Obter um projeto pelo ID
   *     tags: [Projects]
   *     parameters:
   *       - in: query
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       '200':
   *         description: Projeto encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Project'
   *       '400':
   *         description: Erro ao encontrar o projeto
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "erro ao encontrar o projeto"
   *                 error:
   *                   type: object
   *                   example: {}
   */
projectsRoutes.get("/:id",authMiddleware ,async(req,res)=>{
  projectsServices.read(req,res)
})

  /**
   * @swagger
   * /project:
   *   get:
   *     summary: Listar todos os projetos
   *     tags: [Projects]
   *     responses:
   *       '200':
   *         description: Lista de todos os projetos
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Project'
   *       '400':
   *         description: Nenhum projeto encontrado
   */
.get("/",authMiddleware ,async(req,res)=>{
  projectsServices.list(req,res)
})
  /**
   * @swagger
   * /project:
   *   post:
   *     summary: Criar um novo projeto
   *     tags: [Projects]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Project'
   *     responses:
   *       '201':
   *         description: Projeto criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "projeto criado com sucesso"
   *                 response:
   *                   $ref: '#/components/schemas/Project'
   *       '400':
   *         description: Erro ao criar o projeto
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "erro ao criar o projeto"
   *                 error:
   *                   type: object
   *                   example: {}
   */
.post("/", leaderMiddleware,async(req,res)=>{
  projectsServices.create(req,res)  
})
 /**
   * @swagger
   * /project:
   *   put:
   *     summary: Atualizar um projeto pelo ID
   *     tags: [Projects]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Project'
   *     responses:
   *       '200':
   *         description: Projeto atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Project'
   *       '400':
   *         description: Erro ao atualizar o projeto
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "erro ao atualizar o projeto"
   *                 error:
   *                   type: object
   *                   example: {}
   */
.put("/", leaderMiddleware,async(req,res)=>{
  projectsServices.update(req,res)
})
 /**
   * @swagger
   * /project/${id}:
   *   delete:
   *     summary: Excluir um projeto pelo ID
   *     tags: [Projects]
   *     parameters:
   *       - in: query
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       '204':
   *         description: Projeto excluído com sucesso
   *       '400':
   *         description: Erro ao excluir o projeto
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "erro ao excluir o projeto"
   *                 error:
   *                   type: object
   *                   example: {}
   */
.delete("/:id", leaderMiddleware,async(req,res)=>{
  projectsServices.delete(req,res)
})

export default projectsRoutes;