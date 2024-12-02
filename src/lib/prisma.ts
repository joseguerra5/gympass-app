// conexâo com o banco de dados
import { env } from "../env/index"
import {PrismaClient} from "@prisma/client"

export const prisma = new PrismaClient({
  log: env.NODE_ENV=== "dev" ? ["query"] : []
})