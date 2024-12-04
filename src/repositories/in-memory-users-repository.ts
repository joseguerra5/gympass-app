//porta de entrada para qualquer operação no banco de dados todas as operaç~~oes tem que passar por aqi
import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client"




export class PrismaUsersRepository {
  public users: any[] = []
  async create(data: Prisma.UserCreateInput) {
    const user = this.users.push(data)

    return user
  }
}