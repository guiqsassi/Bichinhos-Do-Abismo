import { PrismaClient, User } from "@prisma/client"
import { Response, Request } from "express"

const prisma = new PrismaClient()

type Squad = {
  id?:    number
  name:    string
  stack:   string
}
type SquadManageLeader = {
  idUser: number,
  idSquad: number
}
type SquadManageMember = {
  idUser: number,
  idSquad: number
}
const squadServices = {

    create: async(req: Request,res: Response)=>{
          const squadImportData: Squad = req.body

          await prisma.squad.create({
            data: {
              name: squadImportData.name,
              stack: squadImportData.stack
            }
          }).then(response=>{
            res
            .status(201)
            .json({message: "usuário criado com sucesso", response})
          })
    },
    read: async(req: Request, res: Response)=>{
      const id = req.query.id
        await prisma.squad.findFirst({where: {id: Number(id)}}).then(response =>{
          res
          .status(200)
          .json({message: "squad encontrada", response})
        }).catch(err=>{
          res
          .status(400)
          .json({message: "squad não encontrada", response: err})
        })
    },
    list: async(req:Request, res: Response)=>{
      await prisma.squad.findMany().then(response=>{
         res
        .status(200)
        .json({message: "squads encontradas", response})
      }).catch(err=>{
        res
        .status(400)
        .json({message: "squads não encontradas", response: err})
      })
    },
    delete: async(req:Request, res:Response)=>{
      const id = req.query.id
      await prisma.squad.delete({where: {id: Number(id)}}).then(response =>{
      res
      .status(204)
      }).catch(err=>{
        res
        .status(400)
        .json({message: "algo deu errado ao tentar deletar esta squad", err})
      })
    
    },
    update: async (req:Request, res:Response)=>{
        const SquadInputData: Squad = req.body
        const id = SquadInputData.id
        await prisma.squad.update({
          where: {id},
          data: SquadInputData
        }).then(response=>{
          res
          .status(200)
          .json({message: "squad atualizado com sucesso", response})

        }).catch(err=>{
          res
          .status(400)
          .json({message: "Houve algum problema para encontrar sua squad", err})
        })
    },
    addLeader: async (req:Request,res:Response)=>{
        const leadersIds:SquadManageLeader = req.body

        await prisma.squad.update({
          where: {id: leadersIds.idSquad},
          data: {
            leader: {connect: {id: leadersIds.idUser}}
          }
        }).then(r=>{
            res
          .status(200)
          .json({message: "leader adcionado com sucesso", r})

        }).catch(e=>{
          res
          .status(400)
          .json({message: "Erro ao adcionar leader", e})
        })
    },
    addMember: async (req:Request,res:Response)=>{
      const addMembers:SquadManageMember = req.body

      await prisma.squad.update({
        where: {id: addMembers.idSquad},
        data: {
          leader: {connect: {id: addMembers.idUser}}
        }
      }).then(r=>{
          res
        .status(200)
        .json({message: "leader adcionado com sucesso", r})

      }).catch(e=>{
        res
        .status(400)
        .json({message: "Erro ao adcionar leader", e})
      })
  },
  removeLeader: async (req:Request,res:Response)=>{
      const leadersIds:SquadManageLeader = req.body

      await prisma.squad.update({
        where: {id: leadersIds.idSquad},
        data: {
          leader: {connect: {id: leadersIds.idUser}}
        }
      }).then(r=>{
          res
        .status(200)
        .json({message: "leader adcionado com sucesso", r})

      }).catch(e=>{
        res
        .status(400)
        .json({message: "Erro ao adcionar leader", e})
      })
  },
  removeMember: async (req:Request,res:Response)=>{
    const addMembers:SquadManageMember = req.body

    await prisma.squad.update({
      where: {id: addMembers.idSquad},
      data: {
        leader: {connect: {id: addMembers.idUser}}
      }
    }).then(r=>{
        res
      .status(200)
      .json({message: "leader adcionado com sucesso", r})

    }).catch(e=>{
      res
      .status(400)
      .json({message: "Erro ao adcionar leader", e})
    })
}
}

export default squadServices