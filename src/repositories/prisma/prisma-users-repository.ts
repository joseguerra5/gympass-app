//porta de entrada para qualquer operação no banco de dados todas as operaç~~oes tem que passar por aqi
import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client"
import { UsersRepository } from "../users-repository";

// Tem que imprementar a interface da classe para deixar mais inteligente


export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    //coloco a função para criar o usuário no prisma como uma constante e retorno o user para poder utilizar os dados upados
    return user
  }
}