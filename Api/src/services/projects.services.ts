import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

type Project = {
  id?:           number
  name:         string
  technologies: string
  repository:   string
  squad: number
}

const projectsServices = {
  create: async(req: Request,res: Response)=>{
    const Project: Project = req.body

    await prisma.project.create({
      data: {
        name: Project.name,
        technologies: Project.technologies,
        repository: Project.repository,
        squad: {connect: {id: Number(Project.squad)}},
      },
      select:{
        name: true,
        technologies: true,
        repository: true,
      }
    }).then(response=>{
      res
      .status(201)
      .json({message: "projeto criado com sucesso", response})
    }).catch(e=>{
      res
        .status(400)
        .json({message: "erro ao criar a projeto", e})
      })
  },
  read: async(req: Request, res: Response)=>{
  const id = req.query.id
    await prisma.project.findFirst({where: {id: Number(id)},       
      select:{
        name: true,
        technologies: true,
        repository: true,
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
  await prisma.project.findMany({      
    select:{
      name: true,
      technologies: true,
      repository: true,
  }}).then(response=>{
     res
    .status(200)
    .json({message: "projetos encontrados", response})
  }).catch(err=>{
    res
    .status(400)
    .json({message: "projetos não encontrados", response: err})
  })
  },
  delete: async(req:Request, res:Response)=>{
  const id = req.query.id
  await prisma.squad.delete({where: {id: Number(id)}}).then(response =>{
  res
  .status(204)
  .json({message: "Projeto deletado com sucesso"})
  }).catch(err=>{
    res
    .status(400)
    .json({message: "algo deu errado ao tentar deletar este projeto", err})
  })

  },
  update: async (req:Request, res:Response)=>{
    const projectsInputData: Project = req.body
    const id = projectsInputData.id
    await prisma.squad.update({
      where: {id},
      data: projectsInputData
    }).then(response=>{
      res
      .status(200)
      .json({message: "projeto atualizado com sucesso", response})

    }).catch(err=>{
      res
      .status(400)
      .json({message: "Houve algum problema para atualizar seu projeto", err})
    })
  },

}

export default projectsServices