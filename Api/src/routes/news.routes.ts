import express from "express"
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";
import newsService from "../services/news.services";
import leaderMiddleware from "../middlewares/leader";

const newsRoutes = express.Router()

newsRoutes

  /**
   * @swagger
   * /news/${id}:
   *   get:
   *     summary: Obter uma notícia pelo ID
   *     tags: [News]
   *     parameters:
   *       - in: query
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       '200':
   *         description: Notícia encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/News'
   *       '400':
   *         description: Erro ao encontrar a notícia
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "erro ao encontrar a notícia"
   *                 error:
   *                   type: object
   *                   example: {}
   */
.get("/:id",authMiddleware ,async(req,res)=>{
  newsService.read(req,res)
})
  /**
   * @swagger
   * /news:
   *   get:
   *     summary: Listar todas as notícias
   *     tags: [News]
   *     responses:
   *       '200':
   *         description: Lista de todas as notícias
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/News'
   *       '400':
   *         description: Nenhuma notícia encontrada
   */
.get("/",authMiddleware, async(req,res)=>{
  newsService.list(req,res)
})

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Criar uma nova notícia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tittle:
 *                 type: string
 *                 example: "Nova Notícia"
 *               content:
 *                 type: string
 *                 example: "Conteúdo da nova notícia."
 *               squad:
 *                 type: integer
 *                 example: 1
 *               createdBy:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '201':
 *         description: Notícia criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "notícia criada com sucesso"
 *                 response:
 *                   type: object
 *                   properties:
 *                     tittle:
 *                       type: string
 *                       example: "Nova Notícia"
 *                     content:
 *                       type: string
 *                       example: "Conteúdo da nova notícia."
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-06-24T18:25:43.511Z"
 *                     createdBy:
 *                       type: object
 *                       properties:
 *                         username:
 *                           type: string
 *                           example: "johndoe"
 *       '400':
 *         description: Erro ao criar a notícia
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "erro ao criar a notícia"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Squad não encontrado"
 *     tags:
 *       - News
 */

.post("/", leaderMiddleware, async(req,res)=>{
  newsService.create(req, res)
})
  /**
   * @swagger
   * /news:
   *   put:
   *     summary: Atualizar uma notícia pelo ID
   *     tags: [News]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/News'
   *     responses:
   *       '200':
   *         description: Notícia atualizada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/News'
   *       '400':
   *         description: Erro ao atualizar a notícia
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "erro ao atualizar a notícia"
   *                 error:
   *                   type: object
   *                   example: {}
   */
.put("/",leaderMiddleware ,async(req,res)=>{
  newsService.update(req,res)
})
  /**
   * @swagger
   * /news/${id}:
   *   delete:
   *     summary: Excluir uma notícia pelo ID
   *     tags: [News]
   *     parameters:
   *       - in: query
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       '204':
   *         description: Notícia excluída com sucesso
   *       '400':
   *         description: Erro ao excluir a notícia
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "erro ao excluir a notícia"
   *                 error:
   *                   type: object
   *                   example: {}
   */
.delete("/:id", async(req,res)=>{
  newsService.delete(req,res)
})

export default newsRoutes;