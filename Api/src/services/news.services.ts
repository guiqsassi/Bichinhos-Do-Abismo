import { PrismaClient } from "@prisma/client"
import dayjs from "dayjs"
import { Request, Response } from "express"
type News = {
  id?:          number    
  tittle:      string
  content:     string
  date:        Date
  squad:     number
  createdBy: number

}
const prisma = new PrismaClient()

const newsService =  {
  
  create: async(req: Request,res: Response)=>{
    const newsInputData: News = req.body
    const leader = req.user

    if(leader.squadLeaderId == newsInputData.squad || leader.role == "ADMIN"){
    await prisma.news.create({
      data: {
        tittle: newsInputData.tittle,
        content: newsInputData.content,
        date: dayjs(Date.now()).toDate(),
        squad: {connect: {id: Number(newsInputData.squad)}},
        createdBy: {connect: {id: Number(newsInputData.createdBy)}}
      },
      select:{
        tittle: true,
        content: true,
        date: true,
        createdBy: {
          select: {username: true}
        }
      }
    }).then(response=>{
      res
      .status(201)
      .json({message: "noticia criada com sucesso", response})
    }).catch(e=>{
      res
        .status(400)
        .json({message: "erro ao criar a noticia", e})
      })}else{
        res
        .status(400)
        .json({message: "Você não tem permissão de criar uma noticia nessa squad"})
      }
  },
  read: async(req: Request, res: Response)=>{
  const id = req.query.id
    await prisma.news.findFirst({where: {id: Number(id)},       
      select:{
      tittle: true,
      content: true,
      date: true,
      createdBy: {
        select: {username: true}
      }
    }}).then(response =>{
      res
      .status(200)
      .json({message: "noticia encontrada", response})
    }).catch(err=>{
      res
      .status(400)
      .json({message: "noticia não encontrada", response: err})
    })
  },
  list: async(req:Request, res: Response)=>{
    const squadId = req.body
  await prisma.news.findMany(
    {      
    where: {squadId},
    select:{
    tittle: true,
    content: true,
    date: true,
    createdBy: {
      select: {username: true}
    }
  }}).then(response=>{
     res
    .status(200)
    .json({message: "noticias encontradas", response})
  }).catch(err=>{
    res
    .status(400)
    .json({message: "noticias não encontradas", response: err})
  })
  },
  delete: async(req:Request, res:Response)=>{
  const id = req.query.id
  const leader = req.user

  if(leader.squadLeaderId == id || leader.role == "ADMIN"){
  await prisma.squad.delete({where: {id: Number(id)}}).then(response =>{
  res
  .status(204)
  }).catch(err=>{
    res
    .status(400)
    .json({message: "algo deu errado ao tentar deletar esta noticia", err})
  })}else{
    res
    .status(400)
    .json({message: "você não tem permissão para apagar essa noticia"})
  }

  },
  update: async (req:Request, res:Response)=>{
    const newsInputData: News = req.body
    const id = newsInputData.id

    const leader = req.user

    if(leader.squadLeaderId == newsInputData.squad || leader.role == "ADMIN"){
    await prisma.squad.update({
      where: {id},
      data: newsInputData
    }).then(response=>{
      res
      .status(200)
      .json({message: "news atualizado com sucesso", response})

    }).catch(err=>{
      res
      .status(400)
      .json({message: "Houve algum problema para encontrar sua noticia", err})
    })}else{
      res
      .status(400)
      .json({message: "você não tem permissão para atualizar essa noticia"})
    }
  },

  
  }


  export default newsService