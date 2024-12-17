import 'dotenv/config'

import { randomUUID } from "crypto";
import { execSync } from "node:child_process"
import { Environment } from "vitest";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

//DATABASE_URL=postgresql://docker:docker@localhost:5432/apisolid
function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.")
  }

  // metodo para resgatar a url do databse
  const url = new URL(process.env.DATABASE_URL)

  // metodo para subscrever o searchparams schema da url
  url.searchParams.set("schema", schema)

  return url.toString()
}
export default <Environment>{
  transformMode: 'ssr',
  name: "prisma",
  async setup() {
    const schema = randomUUID()

    const databaseURL = generateDatabaseURL(schema)

    // metodo para subscrever a databaseURL
    process.env.DATABASE_URL = databaseURL

    // metodo para executar comendo em terminal no código
    execSync("npx prisma migrate deploy")
    console.log()



    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`),
          await prisma.$disconnect
      },
    }
  }
}