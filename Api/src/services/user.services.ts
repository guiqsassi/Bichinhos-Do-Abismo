import { PrismaClient } from "@prisma/client"
import { Response, Request } from "express"
const prisma = new PrismaClient()

type User = {
  email: string
  password: string
  username: string
}

const UserSevices = {

    create: async(req: Request,res: Response)=>{
          const userInputData: User = req.body

          await prisma.user.create({
            data: userInputData
          }).then(response=>{
            res
            .status(200)
            .json({message: "usuário criado com sucesso", response})
          })
    }
  
  
}

export default UserSevices