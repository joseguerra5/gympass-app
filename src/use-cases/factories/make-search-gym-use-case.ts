import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { SearchGymUseCase } from "../search-gym"

export function makeSearchGymsUseCase() {
  //principio da inversão de dependencia faz com que o arquivo que precise do caso de uso envie a dependencia instanciando ela primeiro
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymUseCase(gymsRepository)

  return useCase
}