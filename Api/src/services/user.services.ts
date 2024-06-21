import { $Enums, PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { Response, Request } from "express"
const prisma = new PrismaClient()
import dotenv from "dotenv"
dotenv.config()
type User = {
  email: string
  password: string
  username: string
  id: number
  role?: $Enums.Role
}
type Profile = {
  phone:     string
  linkeding: string
  github:    string
  discord:   string
}
const saltRounds = Number(process.env.SALT_ROUNDS)
const UserSevices = {

    create: async(req: Request,res: Response)=>{
          const userInputData: User = req.body
          const profileInputData: Profile = req.body
          let userNewData:User
          
            await bcrypt.genSalt(saltRounds, function(err, salt) {
              bcrypt.hash(userInputData.password, salt, function(err, hash) {});
            });
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(userInputData.password,salt)
            userNewData = {id: userInputData.id, email: userInputData.email, username: userInputData.username, password: hash, role: userInputData.role}
      
          await prisma.user.create({
            data: {
              username: userNewData.username,
              password: userNewData.password,
              role: userNewData.role,
              email: userNewData.email,
              profile: {
                create: {
                  phone: profileInputData.phone,
                  github: profileInputData.github,
                  discord: profileInputData.discord,
                  linkeding: profileInputData.linkeding
                }
              }
            ,}, select: {username: true, email: true, role: true}
          }).then(response=>{
            res
            .status(200)
            .json({message: "usuário criado com sucesso", response})
          }).catch(e=>{
            res
            .status(400)
            .json({message: "usuário não criado", e})
          })
    },
    read: async(req: Request, res: Response)=>{
      const id = req.query.id
        await prisma.user.findFirst({where: {id: Number(id)}, select: {email:true, username:true, profile: true}}).then(response =>{
          res
          .status(200)
          .json({message: "usuário encontrado", response})
        }).catch(err=>{
          res
          .status(400)
          .json({message: "usuário não encontrado", response: err})
        })
    },
    list: async(req:Request, res: Response)=>{
      await prisma.user.findMany({ select: {email:true, username:true, profile: true}}).then(response=>{
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
      await prisma.user.delete({where: {id: Number(id)}}).then(response =>{
      res
      .status(204)
      }).catch(err=>{
        res
        .status(400)
        .json({message: "algo deu errado ao tentar deletar esta user", err})
      })
    
    },
    update: async (req:Request, res:Response)=>{
        const userInputData:User  = req.body
        const id = userInputData.id
        let userNewData:User
        if(userInputData.password){
          await bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(userInputData.password, salt, function(err, hash) {});
          });
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(userInputData.password,salt)
          userNewData = {id: userInputData.id, email: userInputData.email, username: userInputData.username, password: hash}
        }else{
          userNewData = userInputData
        }
        await prisma.squad.update({
          where: {id},
          data: userNewData
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

  
  
}

export default UserSevices