import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-in-repository"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInUseCase } from "../check-in"

export function makeCheckInUseCase() {
  //principio da inversão de dependencia faz com que o arquivo que precise do caso de uso envie a dependencia instanciando ela primeiro
  const checkInRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new CheckInUseCase(checkInRepository, gymsRepository)

  return useCase
}