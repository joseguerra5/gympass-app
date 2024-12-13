import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CreateGymUseCase } from "../create-gym"

export function makeCreateGymUseCase() {
  //principio da inversão de dependencia faz com que o arquivo que precise do caso de uso envie a dependencia instanciando ela primeiro
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}