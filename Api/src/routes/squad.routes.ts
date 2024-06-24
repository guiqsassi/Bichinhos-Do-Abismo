/**
 * @swagger
 * tags:
 *   name: Squads
 *   description: Operações relacionadas a squads
 */


import express from "express"
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import squadServices from "../services/squad.services";
import leaderMiddleware from "../middlewares/leader";

const squadRoutes = express.Router()

squadRoutes
  /**
   * @swagger
   * /squad/${id}:
   *   get:
   *     summary: Obter uma squad pelo ID
   *     tags: [Squads]
   *     parameters:
   *       - in: query
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       '200':
   *         description: Squad encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Squad'
   *       '400':
   *         description: Erro ao encontrar a squad
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "squad não encontrada"
   *                 error:
   *                   type: object
   *                   example: {}
   */
.get("/:id",authMiddleware, async(req,res)=>{
  squadServices.read(req,res)
})
 /**
   * @swagger
   * /squad:
   *   get:
   *     summary: Listar todas as squads
   *     tags: [Squads]
   *     responses:
   *       '200':
   *         description: Lista de todas as squads
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Squad'
   *       '404':
   *         description: Nenhuma squad encontrada
   */
.get("/",authMiddleware ,async(req,res)=>{
    squadServices.list(req,res)
  
})
  /**
   * @swagger
   * /squad:
   *   post:
   *     summary: Criar uma nova squad
   *     tags: [Squads]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Squad'
   *     responses:
   *       '201':
   *         description: Squad criada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "squad criada com sucesso"
   *                 response:
   *                   $ref: '#/components/schemas/Squad'
   *       '400':
   *         description: Erro ao criar a squad
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "erro ao criar a squad"
   *                 error:
   *                   type: object
   *                   example: {}
   */
.post("/",adminMiddleware,async(req,res)=>{
  squadServices.create(req,res)
})
  /**
   * @swagger
   * /squad:
   *   put:
   *     summary: Atualizar uma squad pelo ID
   *     tags: [Squads]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Squad'
   *     responses:
   *       '200':
   *         description: Squad atualizada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Squad'
   *       '400':
   *         description: Erro ao atualizar a squad
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "erro ao atualizar a squad"
   *                 error:
   *                   type: object
   *                   example: {}
   */
.put("/",adminMiddleware, async(req,res)=>{
  squadServices.update(req,res)
})

  /**
   * @swagger
   * /delete:
   *   delete:
   *     summary: Excluir uma squad pelo ID
   *     tags: [Squads]
   *     parameters:
   *       - in: query
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       '204':
   *         description: Squad excluída com sucesso
   *       '400':
   *         description: Erro ao excluir a squad
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "erro ao excluir a squad"
   *                 error:
   *                   type: object
   *                   example: {}
   */
.delete("/:id", adminMiddleware,async(req,res)=>{
  squadServices.delete(req,res)
})
  /**
   * @swagger
   * /squad/addLeader:
   *   put:
   *     summary: Adicionar um líder a uma squad
   *     tags: [Squads]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SquadManageLeader'
   *     responses:
   *       '200':
   *         description: Líder adicionado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "líder adicionado com sucesso"
   *                 response:
   *                   type: object
   *                   example: {}
   *       '400':
   *         description: Erro ao adicionar o líder
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "erro ao adicionar o líder"
   *                 error:
   *                   type: object
   *                   example: {}
   */
.put("/addLeader", leaderMiddleware, async(req,res)=>{
  squadServices.addLeader(req,res)
})
 /**
   * @swagger
   * /squad/addMember:
   *   put:
   *     summary: Adicionar um membro a uma squad
   *     tags: [Squads]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SquadManageMember'
   *     responses:
   *       '200':
   *         description: Membro adicionado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "membro adicionado com sucesso"
   *                 response:
   *                   type: object
   *                   example: {}
   *       '400':
   *         description: Erro ao adicionar o membro
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "erro ao adicionar o membro"
   *                 error:
   *                   type: object
   *                   example: {}
   */
.put("/addMember", leaderMiddleware, async(req,res)=>{
  squadServices.addMember(req,res)
})
  /**
   * @swagger
   * /squad/removeLeader:
   *   put:
   *     summary: Remover um líder de uma squad
   *     tags: [Squads]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SquadManageLeader'
   *     responses:
   *       '200':
   *         description: Líder removido com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "líder removido com sucesso"
   *                 response:
   *                   type: object
   *                   example: {}
   *       '400':
   *         description: Erro ao remover o líder
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "erro ao remover o líder"
   *                 error:
   *                   type: object
   *                   example: {}
   */
.put("/removeLeader", leaderMiddleware, async(req,res)=>{
  squadServices.removeLeader(req,res)
})

  /**
   * @swagger
   * /squad/removeMember:
   *   put:
   *     summary: Remover um membro de uma squad
   *     tags: [Squads]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SquadManageMember'
   *     responses:
   *       '200':
   *         description: Membro removido com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "membro removido com sucesso"
   *                 response:
   *                   type: object
   *                   example: {}
   *       '400':
   *         description: Erro ao remover o membro
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "erro ao remover o membro"
   *                 error:
   *                   type: object
   *                   example: {}
   */
.put("/removeMember", leaderMiddleware, async(req,res)=>{
  squadServices.removeMember(req,res)
})
export default squadRoutes;