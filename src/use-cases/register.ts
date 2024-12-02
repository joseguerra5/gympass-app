import { hash } from "bcryptjs"
import { prisma } from "../lib/prisma"

interface RegisterUseCaseRequest {
  name: string,
  email: string,
  password: string
}

export async function registerUseCase({
  email,
  name,
  password
}: RegisterUseCaseRequest) {
  // para desincriptografar precisa passar a passwor 
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (userWithSameEmail) {
    throw new Error("email already exist")
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash

    }
  })
}